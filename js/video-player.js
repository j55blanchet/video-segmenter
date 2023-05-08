class VideoPlayer extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://unpkg.com/chota@latest');
                div {
                    margin-bottom: 1rem;
                    max-height: 100%;
                }
                #video {
                    max-width: 100%;
                }
                :host {
                    display: block;
                }
                :root {
                    height: 100%;
                }
            </style>
            <div>
                <h2>Video Player</h2>
                <video id="video" controls class="u-full-width"></video>
                <label for="playback-speed">Playback speed: </label>
                <select id="playback-speed" class="input">
                    <option value="0.25">0.25x</option>
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1" selected>1x</option>
                </select>
            </div>
        `;
    
        // Bind methods
        this.handlePlaybackSpeedChange = this.handlePlaybackSpeedChange.bind(this);
    }

    getCurrentTime() {
        const videoElement = this.shadowRoot.querySelector('#video');
        return videoElement.currentTime;    
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#playback-speed').addEventListener('change', this.handlePlaybackSpeedChange);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#playback-speed').removeEventListener('change', this.handlePlaybackSpeedChange);
    }

    handlePlaybackSpeedChange(event) {
        const playbackSpeed = parseFloat(event.target.value);
        const videoElement = this.shadowRoot.querySelector('#video');
        videoElement.playbackRate = playbackSpeed;
    }

    set videoSrc(src) {
        const videoElement = this.shadowRoot.querySelector('#video');
        videoElement.src = src;
    }
}

customElements.define('video-player', VideoPlayer);
