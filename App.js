import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import hourData from './hourData.json'

export default function App() {

  const [show, setShow] = useState(true);

  const libData = hourData

  function readData(item) {
    let location = item.location
    let status = item.times.status
  
    if(status == "closed"){
      var content = 
        <View>
          <Text style={styles.itemDetails}>location:{location}{'\n'}</Text>
          <Text style={styles.itemDetails}>status: {status}{'\n'}</Text>
        </View>
      
    }else if(status == "open"){
      let from = item.times.hours[0]["from"]
      let to = item.times.hours[0]["to"]
      var content = 
          <View>
            <Text style={styles.itemDetails}>location: {location}{'\n'}</Text>
            <Text style={styles.itemDetails}>status: {status}{'\n'}</Text>
            <Text style={styles.itemDetails}>times: from {from} to {to}{'\n'}</Text>
          </View>
    }else if(status == "text"){
      let text = item["times"]["text"]
      var content = 
      <View>
        <Text style={styles.itemDetails}>location: {location}{'\n'}</Text>
        <Text style={styles.itemDetails}>{text}</Text>
      </View>
    }
  
    return(
      <View>
        {show?(<Text style={styles.itemDetails}>{content}</Text>): null}
      </View>
      )
  }

 
  return (
    <SafeAreaView> 
        <FlatList 
        ListHeaderComponent={
          <Text style={styles.title}>
            Library Hours{'\n'}
          <Text style={{paddingTop:10, fontSize: 20, marginLeft: 10}}>This week's schedule</Text>
          </Text>
        }
        data={hourData}
        renderItem={({item}) =>
        <View>
          <TouchableOpacity>
            <Text style={styles.listitem}>{item.day}</Text>
            <Button title={"show/hide"} onPress={() => setShow(!show)}/>
          </TouchableOpacity>
          <View>
                <FlatList
                data={item["hours"]}
                renderItem={({item}) =>(readData(item))}
                keyExtractor={item => item["location"]}
                />
              </View>
        </View>}
        keyExtractor={item => item.date}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({ //what inside{} is a javascript object
  title: {
    paddingTop: 30,
    fontSize: 25,
    paddingBottom: 30,
    backgroundColor: "#99A8F1",
    textAlign: "center",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  listitem: {
    marginTop: 20,
    padding: 30,
    backgroundColor: '#ADD8E6',
    marginHorizontal: 10,
    paddingBottom:20,
  },
  details:{
    color: 'gray',
    textAlign: 'center'
  },
  itemDetails:{
    fontSize: 15,
    backgroundColor: "#cad1e9",
    //alignSelf:"stretch",
    //alignContent: "center",
    textAlignVertical: "center"
  }
});

  /*useEffect( () => {
    fetch(hourData)
      .then((response) => response.json())
      .then((info) => setData(info))
      .catch((error) => console.log(error))
  }, [])
  let day = libData[0].day
  let date = libData[0].date
  let location = libData[0]['location']
  let currently_open = libData['times'][0]['currently_open'][0]
  let hours = libData[0]['times'][0]['hours']
  let status = libData[0]['times'][0]['status']
  */

  /*function renderDetail(item){
    return(
    <View>
      <TouchableOpacity>
          <Text style={styles.listitem}>{item.day}</Text>
          <Text style={styles.details}>hide/show details</Text>
      </TouchableOpacity>
    </View>
    )
  }
  
  <FlatList
      data={data}
      keyExtractor={item => item.day}
      renderItem={({ item }) => ( renderDetail(item) )}
      />
  */

//<Button title="show details" onPress={item => item}/>
