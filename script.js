document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const buildBtn = document.getElementById('buildBtn');
    const downloadLink = document.getElementById('downloadLink');

    // Загрузка файлов
    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);

    // Drag & Drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.background = '#f0f8ff';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.background = 'white';
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileUpload();
        }
    });

    function handleFileUpload() {
        if (fileInput.files.length) {
            const fileName = fileInput.files[0].name;
            uploadArea.innerHTML = `<p>Файл загружен: <strong>${fileName}</strong></p>`;
            buildBtn.disabled = false;
        }
    }

    // Кнопка сборки
    buildBtn.addEventListener('click', () => {
        if (!fileInput.files.length) {
            alert('Сначала загрузи файл проекта (.aia)');
            return;
        }

        buildBtn.textContent = 'Сборка...';
        buildBtn.disabled = true;

        // Здесь будет вызов API для сборки (пока заглушка)
        setTimeout(() => {
            buildBtn.textContent = 'Собрать APK';
            buildBtn.disabled = false;
            downloadLink.href = 'https://example.com/fake-apk.apk'; // Заглушка
            downloadLink.classList.remove('hidden');
            downloadLink.textContent = 'Скачать app.apk';
        }, 3000);
    });
});
// Альтернатива: открываем App Inventor в новой вкладке
buildBtn.addEventListener('click', () => {
    if (!fileInput.files.length) return;
    window.open('https://ai2.appinventor.mit.edu/', '_blank');
});