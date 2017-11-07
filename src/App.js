import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.DOMnodes = [];
    
  }
  
  state = {
    currID: 5,
    linksID: 1,
    links: [],
    nodes: [
      { id: 'id1' },
      { id: 'id2' },
      { id: 'id3' },
      { id: 'id4' },
    
    ]
  };
  
  componentWillMount() {
  
  }
  
  componentDidMount() {
    console.log(this)

  }
  
  addNode = () => {
    let nodes = this.state.nodes;
    this.setState({ currID: this.state.currID + 1 });
    nodes.push({ id: `id${this.state.currID}` }); //TODO сохранять в объекте ссылку на DOMNode для ререндера
    this.setState({ nodes: nodes })
  };
  
  addLink = () => {
    //TODO ре-рендер стрелок при изменениях
    // берем две рандомных ноды и создаем связь между ними
    const drowLinks = (source, target) => {
      let padding = 10; // отступ стрелки от ноды

      // находим поинты для заданной ноды
      const pointPosition = (node) => {
        return {
          leftX: node.offsetLeft - padding,
          rightX: node.offsetLeft + node.offsetWidth + padding,
          Y: node.offsetTop + node.offsetHeight / 2,
          X: node.offsetLeft + node.offsetWidth / 2
        }
      };
      // сохраняем в переменные
      let sourcePos = pointPosition(source);
      let targetPos = pointPosition(target);
      
      //сравниваем стороныи и определям точки для стрелок
      const findSides = (sourcePos, targetPos) => {
        console.log(sourcePos, targetPos)
        if (sourcePos.X === targetPos.X) {
          return { sourcePoint: {X: sourcePos.rightX, direction: 'right'}, targetPoint: {X: targetPos.rightX, direction: 'right'} }
        } else if (sourcePos.X > targetPos.X) {
          return { sourcePoint: {X: sourcePos.leftX, direction: 'left'}, targetPoint: {X: targetPos.rightX, direction: 'right'} }
        } else if (sourcePos.X < targetPos.X) {
          return { sourcePoint: {X: sourcePos.rightX, direction: 'right'}, targetPoint: {X: targetPos.leftX, direction: 'left'} }
        }
      };
      
      // сохраняем в переменную
      const sides = findSides(sourcePos, targetPos);
      console.log(sides);
      
      // добавить Безъе к этим поинтам
      // и вернем d-path
      const makePath = () => {
        //TODO поиск сторон для верных отступов Безъе
        let offset = 140;
        let isEqualSidec = (sides.sourcePoint === sides.targetPoint);
        let sourceBezierOffset = (sides.sourcePoint === 'right') ? offset : -offset;
        let targetBezierOffset = (sides.targetPoint === 'right') ? -offset : offset;
        let M = `M${sides.sourcePoint.X}, ${sourcePos.Y}`;
        let Bezier = `C${sides.sourcePoint.X + sourceBezierOffset}, ${sourcePos.Y} ${sides.targetPoint.X + targetBezierOffset }, ${targetPos.Y}`;
        let T = `${sides.targetPoint.X}, ${targetPos.Y}`;
        return `${M} ${Bezier} ${T}`
      };

      //обновляем стейт линков
      let links = this.state.links; // текущий массив линков
      this.setState({ linksID: this.state.linksID + 1 }); // увеличим временный ID на 1
      
      links.push({ id: `_${this.state.linksID}`, path: makePath() }); // добавим новую линку в массив с этим ID
      
      return this.setState({ links: links }); // обновим стейт линков
    };
    
    // рандомим ноды и запускаем
    const randomNode = () => this.DOMnodes[Math.floor(Math.random() * this.DOMnodes.length)];
    drowLinks(randomNode(), randomNode());
    
  };
  
  
  render() {
    return (

      <div className="App">
        <div>
          <button onClick={this.addNode}>add node</button>
          <button onClick={this.addLink}>add link</button>
        </div>
        <div className="page">
          
          {this.state.nodes.map((e, i) => <div className="node" key={e.id} id={e.id}
                                               ref={node => this.DOMnodes[i] = node}> {e.id} </div>)}
        </div>
        
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className='svg'>
          <defs>
            <marker id="arrowhead" viewBox="0 0 10 10" refX="3" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z"/>
            </marker>
          </defs>
          <g fill="none" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)">
            {this.state.links.map(link => <path key={link.id} id={link.id} d={link.path}/>)}
          </g>
        </svg>
      </div>
    );
  }
}

export default App;