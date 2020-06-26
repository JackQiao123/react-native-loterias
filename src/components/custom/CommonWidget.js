import React from 'react';
import {
  ActivityIndicator, Dimensions, Text, View
} from 'react-native';
import HTMLView from 'react-native-htmlview';

import { Bar } from '../general/Chart';
import { Colors, Metrics, Styles } from '../../theme';

const CommonWidget = {
  renderActivityIndicator: (color = Colors.activityIndicator) => (
    <View style={[Styles.background, Styles.activityIndicator]}>
      <ActivityIndicator color={color} size="small" />
    </View>
  ),

  renderSecondaryActivityIndicator: (color = Colors.activityIndicator) => (
    <View style={Styles.activityIndicator}>
      <ActivityIndicator color={color} size="small" />
    </View>
  ),

  renderHtml: (htmlRaw) => {
    let html = htmlRaw === null ? '' : htmlRaw;
    html = html.replace(/\r?\n|\r/g, '');
    html = `<div>${html}</div>`;
    return (
      <HTMLView
        value={html}
        stylesheet={Styles.html}
      />
    );
  },

  renderChart(data) {
    if (!data || data.length === 0) {
      return null;
    }
    const { width } = Dimensions.get('window');
    const options = {
      width: (width - (Metrics.paddingDefault * 7)),
      height: 100,
      margin: {
        top: 20,
        left: 20,
        bottom: 50,
        right: 20
      },
      color: Colors.chartLine,
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        gridColor: Colors.chartGrid,
        color: Colors.chartGrid,
        label: {
          fontFamily: 'Arial',
          fontSize: 10,
          fontWeight: true,
          fill: Colors.chartAxis,
          marginLeft: -4,
          rotate: -45
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        gridColor: Colors.chartGrid,
        color: Colors.chartGrid,
        label: {
          fontFamily: 'Arial',
          fontSize: 10,
          fontWeight: true,
          fill: Colors.chartAxis
        }
      }
    };

    return (
      <View style={Styles.section}>
        <Bar data={data} options={options} accessorKey="v" />
      </View>
    );
  },

  renderStandardNumbers(numbers, index, recentlyUpdated = false) {
    return (
      <View key={index} style={Styles.standardNumbers}>
        {numbers.map((number, subindex) => (
          this.renderStandardNumber(number, subindex, recentlyUpdated)
        ))}
      </View>
    );
  },

  renderStandardNumber(number, index, recentlyUpdated = false) {
    const str = number;
    const res = str.replace('+', '').replace('=', '').replace('!', '').replace('?', '');
    let color;
    let backgroundColor;

    if (number.indexOf('+') === 1) {
      color = Colors.bonusBallText;
      backgroundColor = Colors.bonusBallBackground;
    } else if (recentlyUpdated) {
      color = Colors.todayBallText;
      backgroundColor = Colors.todayBallBackground;
    } else {
      color = Colors.ballText;
      backgroundColor = Colors.ballBackground;
    }

    return (
      (!number || number.trim().length === 0) ? null : (
        <Text key={index} style={[Styles.standardNumber, { backgroundColor, color }]}>{res}</Text>
      )
    );
  },

  renderCircleNumbers(numbers, index, recentlyUpdated = false) {
    return (
      <View key={index} style={Styles.circleNumbers}>
        {numbers.map((number, subindex) => (
          this.renderCircleNumber(number, subindex, recentlyUpdated)
        ))}
      </View>
    );
  },

  renderCircleNumber(number, index, recentlyUpdated = false) {
    const str = number;
    const res = str.replace('+', '').replace('=', '').replace('!', '').replace('?', '');
    let color;
    let backgroundColor;
    if (number.indexOf('=') === 0) {
      color = Colors.matchBallText;
      backgroundColor = Colors.matchBallBackground;
    } else if (number.indexOf('!') === 0) {
      color = Colors.wrongBallText;
      backgroundColor = Colors.wrongBallBackground;
    } else if (number.indexOf('+') === 0) {
      color = Colors.bonusBallText;
      backgroundColor = Colors.bonusBallBackground;
    } else if (recentlyUpdated) {
      color = Colors.todayBallText;
      backgroundColor = Colors.todayBallBackground;
    } else {
      color = Colors.ballText;
      backgroundColor = Colors.ballBackground;
    }

    const questionIndex = number.indexOf('?');
    return (
      (!res || res.trim().length === 0) ? null
        : (questionIndex === 0 || questionIndex === 1 || res.trim().length > 2)
          ? (
            <Text key={index} style={[Styles.standardNumber, { backgroundColor, color }]}>{res}</Text>
          ) : (
            <View key={index} style={[Styles.circleNumber, { backgroundColor }]}>
              <Text style={[Styles.circleNumberText, { color }]}>{res}</Text>
            </View>
          )
    );
  }
};

export default CommonWidget;
