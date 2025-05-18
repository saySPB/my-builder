document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const buildBtn = document.getElementById('buildBtn');
    const downloadLink = document.getElementById('downloadLink');

    // Загрузка файлов (клик)
    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);

    // Drag & Drop (множественные файлы)
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

    // Функция для отображения списка файлов
    function handleFileUpload() {
        if (!fileInput.files.length) return;
        
        const files = Array.from(fileInput.files);
        let filesHTML = files.map(file => 
            `<div class="file-item">📄 ${file.name} (${formatBytes(file.size)})</div>`
        ).join('');

        uploadArea.innerHTML = `
            <div class="files-list">${filesHTML}</div>
            <p>Перетащите ещё файлы или кликните для загрузки</p>
        `;
        buildBtn.disabled = false;
    }

    // Форматирование размера файла (например, "2.5 MB")
    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Кнопка сборки (теперь обрабатывает все файлы)
    buildBtn.addEventListener('click', () => {
        if (!fileInput.files.length) {
            alert('Загрузите хотя бы один файл!');
            return;
        }

        const files = fileInput.files;
        console.log('Файлы для сборки:', files); // Можно отправить на сервер

        buildBtn.textContent = 'Сборка...';
        buildBtn.disabled = true;

        // Заглушка: имитация сборки
        setTimeout(() => {
            buildBtn.textContent = 'Собрать APK';
            buildBtn.disabled = false;
            downloadLink.href = '#';
            downloadLink.textContent = 'Скачать app.zip (тест)';
            downloadLink.classList.remove('hidden');
        }, 2000);
    });
});