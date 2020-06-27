import React, { Component } from 'react';
import { Text, View } from 'react-native';
import I18n from 'react-native-i18n';

import { Colors, Fonts, Metrics } from '../../theme';
import AppHelper from '../../helpers/AppHelper';
import CommonWidget from './CommonWidget';

const styles = {
  scoreCard: {
    backgroundColor: Colors.scoreCardBackground,
    borderColor: Colors.scoreCardBorder,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrics.paddingDefault
  },
  scoreCardDateContainer: {
    flexDirection: 'row',
    marginBottom: Metrics.marginDefault * 0.7
  },
  scoreCardDate: {
    borderRadius: Metrics.paddingDefault * 2,
    marginRight: Metrics.marginDefault,
    marginTop: 4,
    paddingHorizontal: Metrics.paddingDefault,
    paddingVertical: 4
  },
  scoreCardDateText: {
    color: Colors.scoreCardDateText,
    fontSize: Fonts.size.default
  }
};

class ScoreCard extends Component {
  render() {
    const { type, mode, data } = this.props;
    const isRecentlyUpdated = AppHelper.isRecentlyUpdated(data.date);

    let scoreView = null;
    if (data.score) {
      if (mode === 'text') {
        scoreView = data.score.map((item, index) => (
          CommonWidget.renderStandardNumbers(item, index, isRecentlyUpdated)
        ));
      } else {
        scoreView = data.score.map((item, index) => (
          CommonWidget.renderCircleNumbers(item, index, isRecentlyUpdated)
        ));
      }
    }
    return (
      <View style={styles.scoreCard}>
        {scoreView}
        
        <View style={[styles.scoreCardDateContainer]}>
          {
            type == 'company' && (
              <View style={[styles.scoreCardDate]}>
                <Text style={{color: 'grey'}}>{data.date}</Text>
              </View>
            )
          }
          {
            type == 'game' && (
              <View style={[styles.scoreCardDate, { backgroundColor: isRecentlyUpdated ? Colors.scoreCardDateBackgroundHighlight : Colors.scoreCardDateBackground }]}>
                <Text style={styles.scoreCardDateText}>{data.date}</Text>
              </View>
            )
          }
          {
            data.delay ? (
              <View style={[styles.scoreCardDate, { backgroundColor: Colors.scoreCardDateBackgroundHighlight }]}>
                <Text style={styles.scoreCardDateText}>{I18n.t('delayed')}</Text>
              </View>
            ) : null
          }
          {
            data.no_game_today ? (
              <View style={[styles.scoreCardDate, { backgroundColor: Colors.scoreCardDateBackgroundHighlight }]}>
                <Text style={styles.scoreCardDateText}>{I18n.t('no_game_today')}</Text>
              </View>
            ) : null
          }
        </View>
      </View>
    );
  }
}

export default ScoreCard;
