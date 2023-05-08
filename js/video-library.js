class VideoLibrary extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://unpkg.com/chota@latest');
                div {
                    margin-bottom: 1rem;
                }
            </style>
            <div>
                <h2>Video Selection</h2>
                <label id="video-input-label" for="video-input">Upload a video:</label>
                <input type="file" id="video-input" accept="video/*" aria-labelledby="video-input-label" aria-describedby="video-input-description" class="input">
                <span id="video-input-description" class="input-description">Supported formats: MP4, WebM, Ogg</span>
                <div>
                    <label id="sample-videos-label" for="sample-videos">Or select a sample video:</label>
                    <select id="sample-videos" aria-labelledby="sample-videos-label" class="input">
                        <option value="" selected>Choose a sample video</option>
                        <!-- Sample video options will be populated here -->
                    </select>
                </div>
            </div>
        `;
    

        // Bind methods
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleSampleVideoSelection = this.handleSampleVideoSelection.bind(this);
        this.loadSampleVideos = this.loadSampleVideos.bind(this);

        this.loadSampleVideos();
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#video-input').addEventListener('change', this.handleFileUpload);
        this.shadowRoot.querySelector('#sample-videos').addEventListener('change', this.handleSampleVideoSelection);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#video-input').removeEventListener('change', this.handleFileUpload);
        this.shadowRoot.querySelector('#sample-videos').removeEventListener('change', this.handleSampleVideoSelection);
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.dispatchEvent(new CustomEvent('video-selected', { detail: { videoSrc: URL.createObjectURL(file) } }));
        }
    }

    handleSampleVideoSelection(event) {
        const videoSrc = event.target.value;
        if (videoSrc) {
            this.dispatchEvent(new CustomEvent('video-selected', { detail: { videoSrc } }));
        }
    }

    async loadSampleVideos() {
        try {
            const response = await fetch('videos/video-library.json');
            const sampleVideos = await response.json();
            const sampleVideosSelect = this.shadowRoot.querySelector('#sample-videos');

            sampleVideos.forEach(video => {
                const option = document.createElement('option');
                option.value = video.src;
                option.textContent = video.title;
                sampleVideosSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading sample videos:', error);
        }
    }
}

customElements.define('video-library', VideoLibrary);