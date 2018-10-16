import React, { Component } from 'react';
import './App.css';
import dustVideo from './videos/dust.mp4';
import icebubbleVideo from './videos/icebubble.mp4';

const videos = [
  {
    title: 'Dust',
    src: dustVideo
  },
  {
    title: 'Ice Bubble',
    src: icebubbleVideo,
  }
]

const progressBarWidth = 640;

class App extends Component {
  constructor() {
    super();
    this.state = {
      timeElapsed: 0,
      timeRemaining: 0,
      videoDuration: 0,
      currentVideoIdx: 0,
      nextVideoIdx: 1,
      timeElapsedMinutes: 0,
      timeElapsedSeconds: 0,
      videoDurationSeconds: 0,
      videoDurationMinutes: 0,
    }
  }

  updateVideoDuration = (e) => {
    this.setState({
      videoDuration: e.target.duration,
    })
  }

  updateDurations = (e) => {
    this.setState({
      timeElapsed: e.target.currentTime,
      timeRemaining: e.target.duration - e.target.currentTime,
      timeElapsedMinutes: Math.floor(e.target.currentTime / 60),
      timeElapsedSeconds: Math.floor(e.target.currentTime) % 60,
      videoDurationMinutes: Math.floor(e.target.duration / 60),
      videoDurationSeconds: Math.floor(e.target.duration) % 60,
    });
  }

  updateCurrentlyPlayingVideo = () => {
    const newVideoIndex = this.state.currentVideoIdx === videos.length - 1 ? 0 : this.state.currentVideoIdx + 1;
    const nextVideoIdx = this.state.nextVideoIdx === videos.length - 1 ? 0 : this.state.nextVideoIdx + 1;

    this.setState({
      currentVideoIdx: newVideoIndex,
      nextVideoIdx: nextVideoIdx,
    })
  }

  handleProgressBarClick = (e) => {
    const videoPlayer = document.getElementById('videoPlayer');
    const cursorX = e.pageX - e.target.offsetLeft
    const newCurrentTime = (cursorX / progressBarWidth) * this.state.videoDuration;
    videoPlayer.currentTime = newCurrentTime;
  }

  render() {
    const currentProgressWidth = `${(progressBarWidth/this.state.videoDuration) * this.state.timeElapsed}px`;
    const videoSource = videos[this.state.currentVideoIdx].src;
    const nextVideoTitle = videos[this.state.nextVideoIdx].title;

    return (
      <div className="App">
        <video
          id="videoPlayer"
          height="auto"
          width={`${progressBarWidth}`}
          src={videoSource}
          onTimeUpdate={this.updateDurations}
          onPlay={this.updateVideoDuration}
          onEnded={this.updateCurrentlyPlayingVideo}
          controls
          autoPlay
        />
        <div onClick={this.handleProgressBarClick}>
          <div className="totalProgressBar" />
          <div style={{ width: currentProgressWidth }} className="progressBar" />
        </div>
        <p className="videoTimeDisplay">
          {this.state.timeElapsedMinutes}:{this.state.timeElapsedSeconds}/{this.state.videoDurationMinutes}:{this.state.videoDurationSeconds}
        </p>
        {this.state.timeRemaining <= 10 ? <p className="upNext">up next: {nextVideoTitle}</p> : null}
      </div>
    );
  }
}

export default App;
