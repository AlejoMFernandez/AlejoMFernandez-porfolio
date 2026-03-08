#Requires -RunAsAdministrator
<#
.SYNOPSIS
    Recopila información del servidor: SO, .NET, Node.js, IIS y SQL Server.
.DESCRIPTION
    Script para ejecutar en VMs Windows Server 2019.
    Requiere permisos de administrador.
#>

$separator = "=" * 60

# ─────────────────────────────────────────────────────────────
# 1. VERSION DEL SISTEMA OPERATIVO
# ─────────────────────────────────────────────────────────────
Write-Host "`n$separator" -ForegroundColor Cyan
Write-Host "  SISTEMA OPERATIVO" -ForegroundColor Cyan
Write-Host $separator -ForegroundColor Cyan

$os = Get-CimInstance -ClassName Win32_OperatingSystem
Write-Host "Nombre        : $($os.Caption)"
Write-Host "Version       : $($os.Version)"
Write-Host "Build         : $($os.BuildNumber)"
Write-Host "Arquitectura  : $($os.OSArchitecture)"
Write-Host "Hostname      : $($env:COMPUTERNAME)"

# ─────────────────────────────────────────────────────────────
# 2. VERSIONES DE .NET INSTALADAS
# ─────────────────────────────────────────────────────────────
Write-Host "`n$separator" -ForegroundColor Cyan
Write-Host "  .NET FRAMEWORK / .NET (Core+)" -ForegroundColor Cyan
Write-Host $separator -ForegroundColor Cyan

# .NET Framework (registro)
$netFwKey = 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full'
if (Test-Path $netFwKey) {
    $release = (Get-ItemProperty $netFwKey).Release
    $version = (Get-ItemProperty $netFwKey).Version

    # Mapeo de release a version amigable
    $friendlyName = switch ($true) {
        ($release -ge 528040) { ".NET Framework 4.8"   ; break }
        ($release -ge 461808) { ".NET Framework 4.7.2" ; break }
        ($release -ge 461308) { ".NET Framework 4.7.1" ; break }
        ($release -ge 460798) { ".NET Framework 4.7"   ; break }
        ($release -ge 394802) { ".NET Framework 4.6.2" ; break }
        ($release -ge 394254) { ".NET Framework 4.6.1" ; break }
        ($release -ge 393295) { ".NET Framework 4.6"   ; break }
        ($release -ge 379893) { ".NET Framework 4.5.2" ; break }
        ($release -ge 378675) { ".NET Framework 4.5.1" ; break }
        ($release -ge 378389) { ".NET Framework 4.5"   ; break }
        default               { ".NET Framework 4.x (release $release)" }
    }
    Write-Host ".NET Framework: $friendlyName  (v$version, release $release)"
} else {
    # Buscar versiones anteriores
    $legacyKeys = Get-ChildItem 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP' -ErrorAction SilentlyContinue |
        Where-Object { $_.PSChildName -match '^v[0-9]' }
    if ($legacyKeys) {
        foreach ($k in $legacyKeys) {
            $ver = (Get-ItemProperty $k.PSPath -Name Version -ErrorAction SilentlyContinue).Version
            if ($ver) { Write-Host ".NET Framework $($k.PSChildName): v$ver" }
        }
    } else {
        Write-Host ".NET Framework: No detectado" -ForegroundColor Yellow
    }
}

# .NET (Core / 5 / 6 / 7 / 8+)
$dotnetCmd = Get-Command dotnet -ErrorAction SilentlyContinue
if ($dotnetCmd) {
    Write-Host ""
    Write-Host "SDKs instalados:"
    dotnet --list-sdks | ForEach-Object { Write-Host "  $_" }
    Write-Host ""
    Write-Host "Runtimes instalados:"
    dotnet --list-runtimes | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host ".NET SDK/Runtime (Core+): No instalado" -ForegroundColor Yellow
}

# ─────────────────────────────────────────────────────────────
# 3. VERSION DE NODE.JS
# ─────────────────────────────────────────────────────────────
Write-Host "`n$separator" -ForegroundColor Cyan
Write-Host "  NODE.JS" -ForegroundColor Cyan
Write-Host $separator -ForegroundColor Cyan

$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCmd) {
    $nodeVer = node --version
    $npmVer  = npm --version 2>$null
    Write-Host "Node.js : $nodeVer"
    Write-Host "npm     : v$npmVer"
    Write-Host "Path    : $($nodeCmd.Source)"
} else {
    Write-Host "Node.js : No instalado" -ForegroundColor Yellow
}

# ─────────────────────────────────────────────────────────────
# 4. SITIOS EN IIS
# ─────────────────────────────────────────────────────────────
Write-Host "`n$separator" -ForegroundColor Cyan
Write-Host "  IIS - SITIOS WEB" -ForegroundColor Cyan
Write-Host $separator -ForegroundColor Cyan

try {
    Import-Module WebAdministration -ErrorAction Stop
    $sites = Get-ChildItem IIS:\Sites
    $siteCount = ($sites | Measure-Object).Count
    Write-Host "Cantidad de sitios: $siteCount`n"

    if ($siteCount -gt 0) {
        $sites | ForEach-Object {
            $bindings = ($_.Bindings.Collection | ForEach-Object { $_.bindingInformation }) -join ', '
            Write-Host "  [$($_.State)] $($_.Name)"
            Write-Host "         Bindings : $bindings"
            Write-Host "         Path     : $($_.PhysicalPath)"
            Write-Host ""
        }
    }
} catch {
    # Intentar con Get-IISSite (IISAdministration module)
    try {
        Import-Module IISAdministration -ErrorAction Stop
        $sites = Get-IISSite
        $siteCount = ($sites | Measure-Object).Count
        Write-Host "Cantidad de sitios: $siteCount`n"
        $sites | Format-Table Name, State, @{L='Bindings';E={$_.Bindings.bindingInformation -join ', '}} -AutoSize
    } catch {
        Write-Host "IIS no esta instalado o no se puede acceder al modulo WebAdministration." -ForegroundColor Yellow
    }
}

# ─────────────────────────────────────────────────────────────
# 5. BASES DE DATOS EN SQL SERVER
# ─────────────────────────────────────────────────────────────
Write-Host "`n$separator" -ForegroundColor Cyan
Write-Host "  SQL SERVER - BASES DE DATOS" -ForegroundColor Cyan
Write-Host $separator -ForegroundColor Cyan

# Detectar instancias de SQL Server
$sqlInstances = @()

# Instancias desde servicios
$sqlServices = Get-Service -Name 'MSSQL$*','MSSQLSERVER' -ErrorAction SilentlyContinue |
    Where-Object { $_.Status -eq 'Running' }

foreach ($svc in $sqlServices) {
    if ($svc.Name -eq 'MSSQLSERVER') {
        $sqlInstances += $env:COMPUTERNAME   # instancia default
    } else {
        $instanceName = $svc.Name -replace '^MSSQL\$', ''
        $sqlInstances += "$env:COMPUTERNAME\$instanceName"
    }
}

if ($sqlInstances.Count -eq 0) {
    Write-Host "SQL Server: No se detectaron instancias en ejecucion." -ForegroundColor Yellow
} else {
    foreach ($instance in $sqlInstances) {
        Write-Host "`nInstancia: $instance" -ForegroundColor Green

        $query = @"
SELECT
    d.name                                          AS [Nombre_DB],
    d.state_desc                                    AS [Estado],
    CAST(SUM(mf.size) * 8.0 / 1024 AS DECIMAL(12,2))  AS [Tamano_MB],
    CAST(SUM(mf.size) * 8.0 / 1024 / 1024 AS DECIMAL(12,2)) AS [Tamano_GB]
FROM sys.databases d
JOIN sys.master_files mf ON d.database_id = mf.database_id
GROUP BY d.name, d.state_desc
ORDER BY [Tamano_MB] DESC
"@

        try {
            # Intentar con SqlServer module primero
            $useSqlCmd = $false
            if (Get-Module -ListAvailable -Name SqlServer -ErrorAction SilentlyContinue) {
                Import-Module SqlServer -ErrorAction Stop
                $dbs = Invoke-Sqlcmd -ServerInstance $instance -Query $query -TrustServerCertificate -ErrorAction Stop
            } elseif (Get-Module -ListAvailable -Name SQLPS -ErrorAction SilentlyContinue) {
                Import-Module SQLPS -DisableNameChecking -ErrorAction Stop
                $dbs = Invoke-Sqlcmd -ServerInstance $instance -Query $query -ErrorAction Stop
            } elseif (Get-Command sqlcmd -ErrorAction SilentlyContinue) {
                $useSqlCmd = $true
            } else {
                Write-Host "  No se encontro el modulo SqlServer, SQLPS, ni sqlcmd." -ForegroundColor Yellow
                Write-Host "  Instalar con: Install-Module -Name SqlServer -AllowClobber -Force" -ForegroundColor Yellow
                continue
            }

            if ($useSqlCmd) {
                $raw = sqlcmd -S $instance -E -Q $query -s "|" -W -h 1 2>&1
                Write-Host "  Cantidad de bases de datos:" 
                # Parseo basico de sqlcmd
                $raw | ForEach-Object { Write-Host "  $_" }
            } else {
                $dbCount = ($dbs | Measure-Object).Count
                Write-Host "  Cantidad de bases de datos: $dbCount`n"

                $totalMB = ($dbs | Measure-Object -Property Tamano_MB -Sum).Sum
                $totalGB = [math]::Round($totalMB / 1024, 2)

                $dbs | Format-Table @(
                    @{L='Base de Datos'; E={$_.Nombre_DB}; W=30}
                    @{L='Estado'; E={$_.Estado}; W=10}
                    @{L='Tamaño (MB)'; E={'{0:N2}' -f $_.Tamano_MB}; A='Right'; W=14}
                    @{L='Tamaño (GB)'; E={'{0:N2}' -f $_.Tamano_GB}; A='Right'; W=14}
                ) -AutoSize | Out-String | Write-Host

                Write-Host "  Total: $('{0:N2}' -f $totalMB) MB ($totalGB GB)" -ForegroundColor Green
            }
        } catch {
            Write-Host "  Error conectando a $instance : $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# ─────────────────────────────────────────────────────────────
# RESUMEN FINAL
# ─────────────────────────────────────────────────────────────
Write-Host "`n$separator" -ForegroundColor Cyan
Write-Host "  RESUMEN" -ForegroundColor Cyan
Write-Host $separator -ForegroundColor Cyan
Write-Host "Servidor      : $($env:COMPUTERNAME)"
Write-Host "SO            : $($os.Caption) ($($os.Version))"
Write-Host "Fecha reporte : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host "$separator`n" -ForegroundColor Cyan
