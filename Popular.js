import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Header, AirbnbRating, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import { FlatList } from "react-native-web";

export default class PopularScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  timeConvert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return `${hours} hrs ${minutes} mins`;
  }

  getData = () => {
    const url = "http://localhost:5000/popular-movies";
    axios
      .get(url)
      .then(async response => {
        this.setState({ data: response.data.data });
      })
      .catch(error => {
        console.log(error.message);
      });
  };
keyExtractor = (item,index) => index.toString()
renderItem = ({item,index}) => {
    return(
        <Card 
        key = {`card-${index}`}
        image = {{uri:item.poster_link}}
        imageProps = {{resizeMode:'cover'}}
        featureTitle = {item.title}
        containerStyle = {styles.cardContainer}
        featureTitleStyle = {styles.title}
        featureSubtitle = {`${item.release_date.split('-')[0]}| ${this.timeConvert[item.duration]}`}
        featureSubtitleStyle = {styles.subtitle}

        >
             
        </Card>
    )
}
  render(){
    const {data}=this.state
    
    
    return(
        <View style = {styles.container}>
           <FlatList
           data = {data}
           keyExtractor = {this.keyExtractor}
           renderItem = {this.renderItem}
           />
        </View>
    )
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 0.1
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(18)
  },
  subContainer: {
    flex: 0.9
  },
  subTopContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    flex:1,
    borderRadius: RFValue(10),
    marginBottom: RFValue(20),
    height:RFValue(110),
    justifyContent:'center'
      
  },
  posterImage: {
    width: "60%",
    height: "90%",
    resizeMode: "stretch",
    borderRadius: RFValue(30),
    marginHorizontal: RFValue(10)
  },
  subBottomContainer: {
    flex: 0.6
  },
  upperBottomContainer: {
    flex: 0.2,
    alignItems: "center"
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    textAlign: "center"
  },
  subtitle: {
    fontSize: RFValue(14),
    fontWeight: "300"
  },
  middleBottomContainer: {
    flex: 0.35
  },
  overview: {
    fontSize: RFValue(13),
    textAlign: "center",
    fontWeight: "300",
    color: "gray"
  },
  lowerBottomContainer: {
    flex: 0.45
  },
  iconButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  buttonCotainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: RFValue(160),
    height: RFValue(50),
    borderRadius: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginTop: RFValue(15)
  },
  buttonText: {
    fontSize: RFValue(15),
    fontWeight: "bold"
  }
});
