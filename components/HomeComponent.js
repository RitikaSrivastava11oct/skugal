import React, { Component } from 'react';
import { styles } from '../utility/style';
import { Icon ,SearchBar ,ListItem } from 'react-native-elements';
import { Text, View,Button,FlatList, ScrollView,Image} from 'react-native';
import { HomeApi } from './HomeApi';
import { Loading} from './LoadingComponent';

class HomeComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            search : '',
            searchView : false,
            quizzes:'',
            allQuizzes: '',
            loading : true
        }
    }

    GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    } 

    async componentDidMount(){
        try {
            let response = await HomeApi.fetchData();
            console.log('in home',response);
            if(response.result){}
               await this.setState({quizzes : response.data, allQuizzes : response.allQuizzes,
            loading : false});
        } 
        
        catch (error) {
            throw error;
        }
    }
    updateSearch = value=> { 
        this.setState({ search: value ,
            searchView: true});
    };
    clearSearch = ()=> {
        this.setState({ search: '' ,
            searchView: false});
    };

    updateCount=(id)=>{
        var item = this.state.allQuizzes.find(quiz => quiz.id == id);
        if (item) {
        item.count = item.count+1;
        }
        //  const len=state.dishes.length;
        //    action.payload.id=len;
        //     return {...state, isLoading: false, errMess: null, dishes: state.dishes.concat(action.payload)};
        
        this.state.allQuizzes.sort(this.GetSortOrder("count")); 
        var top5=[];
        for(var i=0;i<5;i++){
            top5.push(this.state.allQuizzes[i]);
        }   
        console.log('top 5',top5);
        this.setState({
            quizzes: top5
        });


    }

    render(){

        const renderTop5Quiz = ({item, index}) => {
            if(item.quiz.title && item.quiz.description)
                return (
                    <View style={{flexDirection : 'row', justifyContent : 'space-between' , marginTop : 20}}>
                        <View style={{ flexDirection : 'row',justifyContent : 'flex-start'}}>
                            <Image
                            source ={{ uri: item.quiz.imageUrl }}/>
                            <View style ={{ marginLeft : 10}}>
                                <Text style ={{ marginBottom: 5,fontSize : 14 , color:'#ffffff'}}>
                                    {item.quiz.title}
                                </Text>
                                <Text style ={{ fontSize : 12 , color : '#808080'}}>
                                {item.count} times
                                </Text>
                            </View>

                        </View>
                        <View style= {{justifyContent : 'flex-end'}}>
                            <Button
                                title ="use"
                                color = '#87CEEB'
                                onPress={()=> {this.updateCount(item.id)}}

                            />
                        </View>
                    </View>
                );
        };

        const renderQuiz = ({item, index}) => {
            if(item.quiz.title && item.quiz.description)
                return (
                    <ListItem
                        key={index}
                        title={item.quiz.title?item.quiz.title:''}
                        style={{ color : '#ffffff'}}
                        subtitle={item.quiz.description?item.quiz.description:''}
                        onPress={() => alert(item.quiz.description)}
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
                {this.state.loading?(<Loading/>):(
                this.state.searchView ? (<View>
                    <ScrollView>
                        <View style = {{ width : '100%'}}> 
                            <FlatList 
                            data={this.state.quizzes.filter(quiz => ( quiz.quiz.title == this.state.search))}
                            renderItem={renderQuiz}
                            keyExtractor={item => item.id?item.id.toString():''}
                            />
                        </View>

                    </ScrollView>

                </View>): 
                (<View>
                    <View style={{flexDirection : 'row' , justifyContent : 'space-between',marginTop: 40}}>
                        <Text style ={{ fontSize : 16, color: '#ffffff',fontWeight : 'bold'}}>
                            Popular Quizzes
                        </Text>
                        <Text style ={{ fontSize : 14 , color : '#808080'}}>
                            5 Quizzes
                        </Text>
                    </View>

                    <ScrollView>
                        <View style = {{ width : '100%'}}> 
                            <FlatList 
                             data={this.state.quizzes}
                            // data={this.state.quizzes.filter(quiz => ( quiz.quiz.title == this.state.search))}
                            renderItem={renderTop5Quiz}
                            keyExtractor={item => item.id?item.id.toString():''}
                            />
                        </View>

                    </ScrollView>
                </View>)
                )}
            </View>
          )
    }
}
 export default HomeComponent;