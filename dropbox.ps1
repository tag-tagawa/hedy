# ここに配列で除外する項目を設定する。
# この場合、node_modulesとignore_filesファイルもしくはフォルダが除外される。
$files = @('node_modules','ignore_files');

for($i = 0; $i -lt $files.Count; $i++){
    $path = "$Pwd" + '\' + $files[$i];
    if (Test-Path "$path")
    {
        Write-Host "--- $path  is dropbox ignores ---";
        Set-Content -Path "$path"  -Stream com.dropbox.ignored -Value 1;
    }
} 