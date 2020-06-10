import React, { Component } from 'react';
import { styles } from '../utility/style';
import { Icon,SearchBar ,ListItem } from 'react-native-elements';
import { Text, View,Button,FlatList, ScrollView,Image,Modal} from 'react-native';
import { Loading} from './LoadingComponent';
import { connect } from 'react-redux';
import { fetchQuizzes ,updateQuiz} from '../redux/ActionCreators';

const mapStateToProps = state => {
     return {
        quizzes: state.quizzes
    }
}

const mapDispatchToProps = dispatch => ({
    fetchQuizzes: () => dispatch(fetchQuizzes()),
    updateQuiz : (itemId) => dispatch(updateQuiz(itemId))
})

class HomeComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            search : '',
            searchView : false,
            showModal: false,
            quiz:''
        }
    }

    async componentDidMount(){
        try {
            await this.props.fetchQuizzes();
            console.log('quizzes',this.props.quizzes.quizzes);
             this.props.quizzes.quizzes.sort(this.GetSortOrder("count"));
        } 
        
        catch (error) {
            throw error;
        }
    }

    GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] < b[prop]) {    
                return 1;    
            } else if (a[prop] > b[prop]) {    
                return -1;    
            }    
            return 0;    
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

    closeModal() {
        this.setState({
            showModal: false
        });
    }

    render(){
        this.props.quizzes.quizzes.sort(this.GetSortOrder("count"));

        const renderTop5Quiz = ({item, index}) => {
            if(item.quiz.title && item.quiz.description)
                return (
                    <View style={{flexDirection : 'row', justifyContent : 'space-between' , marginTop : 20}}>
                        <View style={{ flexDirection : 'row',justifyContent : 'flex-start'}}>
                            <Image style={{ width : 30 ,height : 30}}
                                    source={{uri:item.quiz.imageUrl}}/>
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
                                onPress={()=> {this.props.updateQuiz(item.id);
                                }}
                            />
                        </View>
                    </View>
                );
        };

        const renderRecentQuiz = ({item, index}) => {
            if(item.quiz.title && item.quiz.description)
                return (
                    <View style={{flexDirection : 'row', justifyContent : 'space-between' , marginTop : 20}}>
                        <View style={{ flexDirection : 'row',justifyContent : 'flex-start'}}>
                            <Image style={{ width : 30 ,height : 30}}
                                    source={{uri:item.quiz.imageUrl}}/>
                            <View style ={{ marginLeft : 10}}>
                                <Text style ={{ marginBottom: 5,fontSize : 14 , color:'#ffffff'}}>
                                    {item.quiz.title}
                                </Text>
                                <Text style ={{ fontSize : 12 , color : '#808080'}}>
                                    {item.rating?item.rating:0} rating
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
                        onPress={() => this.setState({quiz : item,showModal : !this.state.showModal})}

                        />
                );
        };
        if (this.props.quizzes.isLoading) {
            return(
                <Loading />
            );
        }
        else
        return(
            <View style={styles.MainContainer}>
                <View style={{flexDirection : 'row', justifyContent:'space-between',marginBottom : 40}}>
                    <Text style={{ fontSize : 25,color: '#ffffff'}}>
                        Quizzes
                    </Text>

                    <Icon
                        name='html5'
                        type='font-awesome'
                        size={24}
                        color='#ffffff'
                    />
                </View>

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
                        <View style = {{ width : '100%'}}>
                            <FlatList 
                            data={this.props.quizzes.quizzes.filter(quiz => ( quiz.quiz.title.includes(this.state.search)))}
                                renderItem={renderQuiz}
                                keyExtractor={item => item.id?item.id.toString():''}
                            />
                        </View>
                            <Modal  transparent={false} visible={this.state.showModal}>
                           
                                        <View style={{ padding :20 ,width : '100%' , backgroundColor: '#ffe6e3'}}>
                                            <View style={styles.topRight}>
                                                <Icon
                                                    name='close'
                                                    type='font-awesome'
                                                    size={26}
                                                    onPress={() => { this.closeModal() }}
                                                    color='red' />
                                            </View>
                                            <Image style={{ height : 200 , width : '100%' }}
                                            source={{uri:this.state.quiz!=''?this.state.quiz.quiz.imageUrl:''}}/>
                                            <View style={{ marginTop: 50 ,backgroundColor: '#ffe6e3'}}  >
                                                
                                                <Text style={{fontSize: 20 ,fontWeight : 'bold', color:'#00008B'}}> {this.state.quiz!=''?this.state.quiz.quiz.title:''}</Text>
                                                <Text style={{fontSize: 18 }}> {this.state.quiz!=''?this.state.quiz.quiz.description:''}</Text>
                                                <Text style={{fontSize: 18 }}> {this.state.quiz!=''?this.state.quiz.quiz.type:''}</Text>
                                                <Text style={{fontSize: 18 }}> {this.state.quiz!=''?this.state.quiz.count:''} times</Text>
                                                <Text style={{fontSize: 18 }}> {this.state.quiz!=''?this.state.quiz.quiz.rating:''} times</Text>

                                            </View>
                                        </View>
                            </Modal>
                        
                    </ScrollView>

                </View>): 
                (<View>
                    <ScrollView>
                        <View>
                        <View style={{flexDirection : 'row' , justifyContent : 'space-between',marginTop: 40}}>
                            <Text style ={{ fontSize : 16, color: '#ffffff',fontWeight : 'bold'}}>
                                Popular Quizzes
                            </Text>
                            <Text style ={{ fontSize : 14 , color : '#808080'}}>
                                5 Quizzes
                            </Text>
                        </View>

                    
                        <View style = {{ width : '100%'}}> 
                            <FlatList 
                             data={this.props.quizzes.quizzes.slice(0,5)}
                             maxToRenderPerBatch={5}
                            renderItem={renderTop5Quiz}
                            keyExtractor={item => item.id?item.id.toString():''}
                            />
                        </View>

                        <View style={{flexDirection : 'row' , justifyContent : 'space-between',marginTop: 40}}>
                            <Text style ={{ fontSize : 16, color: '#ffffff',fontWeight : 'bold'}}>
                                Recent Quizzes
                            </Text>
                            <Text style ={{ fontSize : 14 , color : '#808080'}}>
                                Recently Used
                            </Text>
                        </View>

                    
                        <View style = {{ width : '100%'}}> 
                            <FlatList 
                             data={this.props.quizzes.quizzes.slice(0,5)}
                             maxToRenderPerBatch={5}
                            renderItem={renderRecentQuiz}
                            keyExtractor={item => item.id?item.id.toString():''}
                            />
                        </View>
                        </View>
                    </ScrollView>
                </View>)
                }
            </View>
          )
    }
}
 export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);