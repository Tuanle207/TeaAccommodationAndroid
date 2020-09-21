$file = './.env'
$start = 'http://'
$end = ':8000'
$ip = (Get-NetIPAddress | Where-Object {$_.AddressState -eq "Preferred" -and $_.ValidLifetime -lt "24:00:00"}).IPAddress
$regex = '(?<=SERVER_URL=)[^"]*'
(Get-Content $file) -replace $regex, "$start$ip$end" | Set-Content $file
exit

