import React, { Component } from 'react';
import './App.css';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3
    this.state = {
      mode: "welcome",
      subject: {
        title: "WEB",
        sub: "World Wide Web!"
      },
      welcome: {title: "Welcome", desc: "Hello, React!"},
      selected_content_id: null,
      contents: [
        {id: 1, title: "Html", desc: "Html is for markup"},
        {id: 2, title: "Css", desc: "Css is for style"},
        {id: 3, title: "JavaScript", desc: "JavaScript is for interaction"}
      ]
    }
  }

  getReadContent(){
    let i;
      for(i=0; i < this.state.contents.length; i++){
        let data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data
        }
      }
  }

  getContent(){
    let _title, _desc, _article = null;
    let mode = this.state.mode;

    if(mode === "welcome"){ 
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(mode === "read"){
      let _content = this.getReadContent();

      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        let _contents = Array.from(this.state.contents);
        _contents.push({
          id: this.max_content_id,
          title: _title,
          desc: _desc
        })
        this.setState({
          contents: _contents,
          mode: 'read',
          selected_content_id: this.max_content_id
        })
      }.bind(this)}></CreateContent>
    } else if(mode === 'update'){
      let _content = this.getReadContent();
      _article = <UpdateContent 
        data={_content}
        onSubmit={function(_id, _title, _desc){
          let _contents = Array.from(this.state.contents);
          let i;
          for(i=0; i < _contents.length; i++){
            if(_id === _contents[i].id) {
              _contents[i] = { id: _id, title: _title, desc: _desc}
              break
            }
          }
          this.setState({
            contents: _contents,
            mode: 'read'
          })
        }.bind(this)} 
      ></UpdateContent>
    }
    return _article
  }

  render(){
    return(
      <div className="App">
        <Subject 
          title= {this.state.subject.title} 
          sub= {this.state.subject.sub}
          onChangePage= {function(){
           this.setState({
             mode: "welcome"
           }) 
          }.bind(this)}
          ></Subject>
        <TOC 
          data={this.state.contents}
          onChangePage={function(id){
            this.setState({
              mode: "read",
              selected_content_id: Number(id)
            })
          }.bind(this)}  
        ></TOC>
        <Control
          onChangeMode={function(_mode){
            if(_mode === 'delete'){
              if(window.confirm('정말 삭제할까요?')){
                let i;
                let _contents = Array.from(this.state.contents);
                for(i=0; i<_contents.length; i++){
                  if(_contents[i].id === this.state.selected_content_id){
                    _contents.splice(i,1);
                    break
                  }
                  this.setState({
                    mode: 'welcome',
                    contents: _contents
                  })
                }
                alert('삭제완료!')
              }
            }else {
              this.setState({
                mode: _mode
              })
            }
          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    )
  }
}

export default App;
