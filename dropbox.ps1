# �����ɔz��ŏ��O���鍀�ڂ�ݒ肷��B
# ���̏ꍇ�Anode_modules��ignore_files�t�@�C���������̓t�H���_�����O�����B
$files = @('node_modules','ignore_files');

for($i = 0; $i -lt $files.Count; $i++){
    $path = "$Pwd" + '\' + $files[$i];
    if (Test-Path "$path")
    {
        Write-Host "--- $path  is dropbox ignores ---";
        Set-Content -Path "$path"  -Stream com.dropbox.ignored -Value 1;
    }
} 