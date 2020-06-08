import React, { Component } from 'react';
import { styles } from '../utility/style';
import { Icon ,SearchBar ,ListItem } from 'react-native-elements';
import { Text, View,Button,FlatList, ScrollView} from 'react-native';
import { HomeApi } from './HomeApi';

class HomeComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            search : '',
            searchView : false,
            quizzes:''
        }
    }

    async componentDidMount(){
        try {
            let response = await HomeApi.fetchData();
            if(response.result)
                this.setState({quizzes : response.data});
                console.log('quizzes', this.state.quizzes);
        } catch (error) {
            console.log('error while fetching data in Home Component', error);
            throw error;
        }
    }
    updateSearch = value=> {
        
        this.setState({ search: value ,
            searchView: true});
            console.log('update search',this.state.searchView);
    };
    clearSearch = ()=> {
        this.setState({ search: '' ,
            searchView: false});
    };

    render(){

        const renderQuiz = ({item, index}) => {
            console.log('hhh');
            return (
                    <ListItem
                        key={index}
                        title={item.title}
                        style={{ color : '#ffffff'}}
                        subtitle={item.description}
                        // hideChevron={true}
                        onPress={() => navigate('Dishdetail', { dishId: item.id })}
                        // leftAvatar={{ source: {uri: baseUrl + item.image}}}
                        />

            );
        };
        
        return(
            <View style={styles.MainContainer}>
                <SearchBar
                    rightIconContainerStyle={{backgroundColor :'#151B54',search: '' }}
                    placeholder="Search weapon here"
                    lightTheme = {true}
                    round ={true}
                    onClear ={()=>this.clearSearch()}
                    onChangeText={(value)=>this.updateSearch(value)}
                    value={this.state.search}
                />
                {this.state.searchView ? (<View>
                    <ScrollView>
                        <Text style= {{ color : '#ffffff'}}>
                            hiiii
                        </Text>
                        <FlatList 
                        // data={this.state.quizzes.filter(quiz => ( quiz.type === this.state.search))}
                        data={this.state.quizzes}
                        renderItem={renderQuiz}
                        keyExtractor={item => item.id.toString()}
                        />
                    </ScrollView>

                </View>): 
                (
                <View>
                    <View style={{flexDirection : 'row' , justifyContent : 'space-between',paddingTop: 30}}>
                        <Text style ={{ fontSize : 16, color: '#ffffff',fontWeight : 'bold'}}>
                            Recent use
                        </Text>
                        <Text style ={{ fontSize : 14 , color : '#FFC0CB'}}>
                            Clear History
                        </Text>
                    </View>

                    <View style={{flexDirection : 'row', justifyContent : 'space-between' , marginTop : 20}}>
                        <View style={{ flexDirection : 'row',justifyContent : 'flex-start'}}>
                            <Icon
                                name ='html5'
                                type = 'font-awesome'
                                color='#FFFF00'
                                size= {39}
                            />
                            <View style ={{ marginLeft : 10}}>
                                <Text style ={{ marginBottom: 5,fontSize : 14 , color:'#ffffff'}}>
                                    Html 5
                                </Text>
                                <Text style ={{ fontSize : 12 , color : '#808080'}}>
                                    120 Times
                                </Text>
                            </View>

                        </View>
                        <View style= {{justifyContent : 'flex-end'}}>
                            <Button
                                title ="use"
                                color = '#87CEEB'
                            />
                        </View>
                    </View>

                    <View style={{flexDirection : 'row', justifyContent : 'space-between' , marginTop : 20}}>
                        <View style={{ flexDirection : 'row',justifyContent : 'flex-start'}}>
                            <Icon
                                name ='vuejs'
                                type = 'font-awesome'
                                color='#228B22'
                                size= {39}
                            />
                            <View style ={{ marginLeft : 10}}>
                                <Text style ={{ marginBottom: 5,fontSize : 14 , color:'#ffffff'}}>
                                    Vue Javascript
                                </Text>
                                <Text style ={{ fontSize : 12 , color : '#808080'}}>
                                    120 Times
                                </Text>
                            </View>

                        </View>
                        <View style= {{justifyContent : 'flex-end'}}>
                            <Button
                                title ="use"
                                color = '#87CEEB'
                            />
                        </View>
                    </View>

                    <View style={{flexDirection : 'row', justifyContent : 'space-between' , marginTop : 20}}>
                        <View style={{ flexDirection : 'row',justifyContent : 'flex-start'}}>
                            <Icon
                                name ='css3'
                                type = 'font-awesome'
                                color='#0000FF'
                                size= {39}
                            />
                            <View style ={{ marginLeft : 10}}>
                                <Text style ={{ marginBottom: 5,fontSize : 14 , color:'#ffffff'}}>
                                    CSS
                                </Text>
                                <Text style ={{ fontSize : 12 , color : '#808080'}}>
                                    120 Times
                                </Text>
                            </View>

                        </View>
                        <View style= {{justifyContent : 'flex-end'}}>
                            <Button
                                title ="use"
                                color = '#87CEEB'
                                
                            />
                        </View>
                    </View>

                    <View style={{flexDirection : 'row' , justifyContent : 'space-between',marginTop: 40}}>
                        <Text style ={{ fontSize : 16, color: '#ffffff',fontWeight : 'bold'}}>
                            Popular weapon
                        </Text>
                        <Text style ={{ fontSize : 14 , color : '#808080'}}>
                            4 weapon
                        </Text>
                    </View>

                    <View style={{flexDirection : 'row', justifyContent : 'space-between' , marginTop : 30}}>
                        <View style={{ flexDirection : 'row',justifyContent : 'flex-start'}}>
                            <Icon
                                name ='angular'
                                type = 'font-awesome'
                                color='#FF0000'
                                size= {39}
                            />
                            <View style ={{ marginLeft : 10}}>
                                <Text style ={{ marginBottom: 5,fontSize : 14 , color:'#ffffff'}}>
                                    Angular Javascript
                                </Text>
                                <Text style ={{ fontSize : 12 , color : '#808080'}}>
                                    2120 Times
                                </Text>
                            </View>

                        </View>
                        <View style= {{justifyContent : 'flex-end'}}>
                            <Button
                                outline
                                title ="use"
                                color = '#87CEEB'
                            />
                        </View>
                    </View>

                    <View style={{flexDirection : 'row', justifyContent : 'space-between' , marginTop : 20}}>
                        <View style={{ flexDirection : 'row',justifyContent : 'flex-start'}}>
                            <Icon
                                name ='react'
                                type = 'font-awesome'
                                color='#808080'
                                size= {39}
                            />
                            <View style ={{ marginLeft : 10}}>
                                <Text style ={{ marginBottom: 5,fontSize : 14 , color:'#ffffff'}}>
                                    Vue Javascript
                                </Text>
                                <Text style ={{ fontSize : 12 , color : '#808080'}}>
                                2090 Times
                                </Text>
                            </View>

                        </View>
                        <View style= {{justifyContent : 'flex-end'}}>
                            <Button
                                title ="use"
                                color = '#87CEEB'
                                type = 'outline'
                            />
                        </View>
                    </View>

                    <View style={{flexDirection : 'row', justifyContent : 'space-between' , marginTop : 20}}>
                        <View style={{ flexDirection : 'row',justifyContent : 'flex-start'}}>
                            <Icon
                                name ='js-square'
                                type = 'font-awesome5'
                                color='#FFFF00'
                                size= {39}
                            />
                            <View style ={{ marginLeft : 10}}>
                                <Text style ={{ marginBottom: 5,fontSize : 14 , color:'#ffffff'}}>
                                    React Javascript
                                </Text>
                                <Text style ={{ fontSize : 12 , color : '#808080'}}>
                                    1891 Times
                                </Text>
                            </View>

                        </View>
                        <View style= {{justifyContent : 'flex-end'}}>
                            <Button
                            
                                title ="use"
                                color = '#87CEEB'
                                type = 'outline'
                            />
                        </View>
                    </View>

                </View>
                )}
            </View>
        );
    }
}
 export default HomeComponent;