import {StyleSheet} from 'react-native';
import {
    MARGIN_SMALL,
    MARGIN_MEDIUM, 
    MARGIN_LARGE, 
    MARGIN_HUGE,
    PADDING_SMALL,
    PADDING_MEDIUM,
    PADDING_LARGE,
    PADDING_HUGE} 
from './default.value';

/**
 * * Group of styles for bottom margin 
 */

export const marginSmall = StyleSheet.create({
    marginBottom: MARGIN_SMALL
});

export const marginMedium = StyleSheet.create({
    marginBottom: MARGIN_MEDIUM
});

export const marginLarge = StyleSheet.create({
    marginBottom: MARGIN_LARGE
});

export const marginHuge = StyleSheet.create({
    marginBottom: MARGIN_HUGE
});

/**
 * * Group of styles for padding 
 */

export const paddingSmall = StyleSheet.create({
    padding: PADDING_SMALL
});

export const paddingMedium = StyleSheet.create({
    padding: PADDING_MEDIUM
});

export const paddingLarge = StyleSheet.create({
    padding: PADDING_LARGE
});

export const paddingHuge = StyleSheet.create({
    padding: PADDING_HUGE
});