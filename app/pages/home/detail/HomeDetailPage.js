import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import { Button } from '../../../components'
import {ActivityIndicator} from 'antd-mobile-rn';
import { NavigationActions ,createAction} from '../../../utils'
@connect(({ loading }) => ({ ...loading }))
class HomeDetailPage extends Component {

  constructor(props){
    super(props);

  }


  componentDidMount(){
    const {navigation} = this.props;
    navigation.setParams({onPress:this.onClickRight})
  }

  onClickRight=()=>{
    log("onClickRight",this.props);
    alert("你点击了")
  };

  goBack = () => {
    this.props.dispatch(NavigationActions.back())
  };
  Get=()=>{
    this.props.dispatch(createAction("example/taskExampleGET")({age:18}));
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator  animating={this.props.global}/>
        <Button text="Go Back" onPress={this.goBack} />
        <Button text="Get" onPress={this.Get} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeDetailPage
