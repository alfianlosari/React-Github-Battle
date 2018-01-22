import React from 'react';
import Popular from './Popular';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Nav from './Nav';
import Battle from './Battle';
import Results from './Results';


class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/battle/results' component={Results}/>
                        <Route path='/popular' component={Popular} />
                        <Route render={() => { 
                            return <p>Not Found</p>
                        }}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App