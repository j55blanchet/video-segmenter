document.addEventListener('DOMContentLoaded', () => {
    const videoLibrary = document.querySelector('video-library');
    const videoPlayer = document.querySelector('video-player');
    const treeVisualizer = document.querySelector('tree-visualizer');

    videoLibrary.addEventListener('video-selected', (event) => {
        videoPlayer.videoSrc = event.detail.videoSrc;
    });

    treeVisualizer.addEventListener('request-video-time', () => {
        const currentTime = videoPlayer.getCurrentTime();
        document.querySelector('tree-visualizer').addSegment(currentTime);
    });
    // Wire up other components as needed
});
