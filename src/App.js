import React, {Component} from 'react'
import {View} from 'react-native'
import firebase from 'firebase'
import {Button, Header, Spinner} from './components/common'
import LoginForm from "./components/LoginForm";

class App extends Component {
    state = {loggedIn: null};

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyB6CbftYkVx8PwAvVnVQ2F3n2JDtYKgBcU",
            authDomain: "authentication-f6092.firebaseapp.com",
            databaseURL: "https://authentication-f6092.firebaseio.com",
            projectId: "authentication-f6092",
            storageBucket: "authentication-f6092.appspot.com",
            messagingSenderId: "48927881185"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                this.setState({loggedIn: true});
            else
                this.setState({loggedIn: false});
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <View style={{height: '21.5%'}}>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </View>
                );
            case false:
                return <LoginForm/>;
            default:
                return (
                    <View style={{height: '25%'}}>
                        <Spinner size="large"/>
                    </View>
                );
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>
        );
    }
}

export default App