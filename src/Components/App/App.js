import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.js'

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
  
      searchResults: [],
      playlistName: 'Name a playlist',
      playlistTracks: [],
    
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    // Our array of playlist tracks that we can loop through
    let tracks = this.state.playlistTracks;
    if(tracks.find(saved=> saved.id === tracks.id)){
      return;
    }
    tracks.push(track);

    // set to our updated array of objects
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
  
    tracks = tracks.filter(currentTrack => track.id !== currentTrack.id);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    let trackURIs = [];
    this.state.playlistTracks.forEach(playlistTrack => {
      trackURIs.push(playlistTrack.uri);
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistTracks:[], playlistName: 'New Playlist', searchResults:[]});
  }

  search(term){
    Spotify.search(term).then(tracks => {
      this.setState({searchResults: tracks});
    });
  }

  
  render(){
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
      <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
