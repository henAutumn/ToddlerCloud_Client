import React, {Component} from 'react';
import { Card, Button, CardImg, CardDeck,
 CardBody,Label, Input, Row, Col ,Form } from 'reactstrap';

export default class Artlog extends Component{
    constructor(props){
        super(props);
        this.state={
            artlogs:[],
            isDeleted:false,
            notes:'',
            id:'', 
        }
    }
componentWillMount(){
    this.createList();
}
  createList=()=>{
      
      if(localStorage.getItem('token'))
      {
        fetch('http://localhost:3001/api/artlog/', {
            method: 'GET',
            headers:new Headers({  
                'Content-Type':'application/json',
                'Authorization':localStorage.getItem('token')
            }),
            
        })
        .then(response => response.json())
        .then(data => this.setState({artlogs:data}))
    }
  }
  handleChange=(event)=>{
    this.setState({
                notes:event.target.value,
                
//     });
//     if(event.target.name===''){
//         console.log('Empty')
//     };
// }
//   handleSubmit=(event)=>{
//     event.preventDefault();
//     console.log(this.state.id);
        // fetch(`http://localhost:3000/api/artlog/update/${this.state.id}`,{
        //     method:'PUT',
        //     body:JSON.stringify({notes:this.state.notes}),
        //     headers: new Headers({
        //         'Content-Type':'application/json'
        //     })

        // })
        // .then(response=> response.json())
    })}
    
    
    populateList=()=>{
        
        return(
            this.state.artlogs.map(artlog =>{

                return(
                    <Col key={artlog.id} lg="6">
                    <Card>
                    <CardImg width="100%" src={`${artlog.artpng}`} alt={`Artpng ${artlog.id}`} />
                    <CardBody>

                    <Form onSubmit={this.handleSubmit}>
                    <Label>Notes</Label>
                    <Input type="textarea" data-id={artlog.id} name="notes" onChange={this.handleChange}/>
                    <Button  type="submit">Update Notes</Button>
                    <Button>Delete Art</Button> 
                    </Form>                   
                    </CardBody>
                    </Card>
                </Col>
    
)}))}

    




render(){
    
    return(
        <div>
    <h1>Your Art Cloud!</h1> 
    <Row>
        <CardDeck>
            {this.populateList()}
        </CardDeck>
    </Row>
    </div>
    )
}


}


