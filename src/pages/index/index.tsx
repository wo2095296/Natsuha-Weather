import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import Summary from '../../components/Summary/Summary';
import Detail from '../../components/Detail/Detail';
import SunAndMoon from '../../components/SunAndMoon/SunAndMoon';
import Wind from '../../components/Wind/Wind';
import Forecast from '../../components/Forecast/Forecast';
import Background from '../../components/Background/Background';
import Precipitation from '../../components/Precipitation/Precipitation';
import Search from '../../components/Search/Search';

import './index.scss';

interface IIndexProps {
  weatherStore: {
    getWeatherById: Function;
    getRegion: Function;
    getPosition: Function;
    handleTemperatureType: Function,
  };
}

interface IIndexStates {
  needBlur: boolean;
}

@inject('weatherStore')
@observer
class Index extends Component<IIndexProps, IIndexStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      needBlur: false
    };
  }
  config: Config = {
    navigationBarTitleText: '夏葉'
  };

  componentWillMount() {
    wx.cloud.init();
  }

  componentDidMount() {
    const { weatherStore } = this.props;
    weatherStore.getPosition();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  // public onPullDownRefresh = () => {
  //   const { weatherStore } = this.props;
  //   weatherStore.getPosition();
  // };

  public onPageScroll(e: any) {
    if (e.scrollTop >= 100) {
      this.setState({
        needBlur: true
      });
    } else {
      this.setState({
        needBlur: false
      });
    }
  }

  render() {
    const { needBlur } = this.state;
    return (
      <View className="index">
        <Background needBlur={needBlur} />
        <Summary />
        <Forecast />
        <Detail />
        <Precipitation />
        <SunAndMoon />
        <Wind />
        <Search />
      </View>
    );
  }
}

export default Index as ComponentType;
