import React, {Component} from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps, newState){
        if(newProps.data === this.props.data){
            return false
        }
        console.log("shouldUpdateComponent toc")
        return true
    }
    render() {
        console.log("render toc")
        let list = [];
        const data = this.props.data;
        let i;
        for(i = 0; i < data.length; i++){
            list.push(
            <li key={data[i].id}>
                <a
                  // data-id={data[i].id} 
                  href={"/contents"+ data[i].id}
                  onClick={function(id, e){
                    e.preventDefault();
                    this.props.onChangePage(id);
                  }.bind(this, data[i].id)}
                >{data[i].title}</a>
            </li>
            )
        }

      return(
        <nav>
          <ul>
            {list}
          </ul>
        </nav>
      )
    }
  }

  export default TOC;