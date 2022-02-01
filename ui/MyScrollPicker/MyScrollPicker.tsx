import React, { ReactElement } from 'react';
import styled from 'styled-components';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Box } from 'native-base';

const deviceWidth = Dimensions.get('window').width;
export default class ScrollPicker extends React.Component<Props> {
    timer: any = null
    sview: any = null
    isScrollTo = false
    dragStarted = false
    momentumStarted = false
    constructor(props: any) {
        super(props);
        this.onMomentumScrollBegin = this.onMomentumScrollBegin.bind(this);
        this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
        this.onScrollBeginDrag = this.onScrollBeginDrag.bind(this);
        this.onScrollEndDrag = this.onScrollEndDrag.bind(this);
        this.state = {
            selectedIndex: 1,
        }
    }

    componentDidMount() {
        if (this.props.selectedIndex) {
            this.scrollToIndex(this.props.selectedIndex);
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {
        const { header, footer } = this.renderPlaceHolder();
        return (
            <Container
                style={{
                    ...styles.container, height: this.props.wrapperHeight,
                    width: this.props.wrapperWidth, backgroundColor: this.props.wrapperBackground
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        top: (this.props.wrapperHeight - this.props.itemHeight) / 2,
                        height: this.props.itemHeight, width: this.props.highlightWidth,
                        borderTopColor: this.props.highlightColor, borderBottomColor: this.props.highlightColor,
                        borderTopWidth: this.props.highlightBorderWidth, borderBottomWidth: this.props.highlightBorderWidth
                    }}
                />
                <ScrollView
                    ref={(sview) => {
                        this.sview = sview;
                    }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    onTouchStart={this.props.onTouchStart}
                    onMomentumScrollBegin={this.onMomentumScrollBegin}
                    onMomentumScrollEnd={this.onMomentumScrollEnd}
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    onScrollEndDrag={this.onScrollEndDrag}
                >
                    {header}
                    {this.props.dataSource.map(this.renderItem.bind(this))}
                    {footer}
                </ScrollView>
            </Container >
        );
    }

    renderPlaceHolder() {
        const height = (this.props.wrapperHeight - this.props.itemHeight) / 2;
        const header = <View style={{ height, flex: 1 }}></View>;
        const footer = <View style={{ height, flex: 1 }}></View>;
        return { header, footer };
    }

    renderItem(data: ReactElement<any, any>, index: number) {
        //@ts-ignore
        const isSelected = index === this.state.selectedIndex;
        //@ts-ignore
        const item = <Text style={isSelected ? this.props.activeItemTextStyle : this.props.itemTextStyle}>{data}</Text>;

        return (
            <View style={{ ...styles.selectedItem, height: this.props.itemHeight }} key={index}>
                {item}
            </View>
        );
    }

    scrollFix(e: any, value?: string) {
        let verticalY = 0;
        const h = this.props.itemHeight;
        if (e.nativeEvent.contentOffset) {
            verticalY = e.nativeEvent.contentOffset.y;
        }
        const selectedIndex = Math.round(verticalY / h);
        const verticalElem = selectedIndex * h;
        if (verticalElem !== verticalY) {
            // using scrollTo in ios, onMomentumScrollEnd will be invoked
            if (Platform.OS === 'ios') {
                this.isScrollTo = true;
            }
            if (this.sview) {
                this.sview.scrollTo({ y: verticalElem });
            }
        }
        //@ts-ignore
        if (this.state.selectedIndex === selectedIndex) {
            return;
        }
        this.setState({
            selectedIndex,
        });

        if (this.props.onValueChange) {
            const selectedValue = this.props.dataSource[selectedIndex];
            this.props.onValueChange(selectedValue, selectedIndex);
        }
    }

    onScrollBeginDrag() {
        this.dragStarted = true;
        if (Platform.OS === 'ios') {
            this.isScrollTo = false;
        }
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    onScrollEndDrag(e: any) {
        this.props.onScrollEndDrag();
        this.dragStarted = false;
        // if not used, event will be garbaged
        const element = {
            nativeEvent: {
                contentOffset: {
                    y: e.nativeEvent.contentOffset.y,
                },
            },
        };
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(
            () => {
                if (!this.momentumStarted && !this.dragStarted) {
                    this.scrollFix(element, 'timeout');
                }
            },
            10
        );
    }

    onMomentumScrollBegin() {
        this.momentumStarted = true;
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    onMomentumScrollEnd(e: any) {
        this.props.onMomentumScrollEnd();
        this.momentumStarted = false;
        if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
            this.scrollFix(e);
        }
    }

    scrollToIndex(ind: number) {
        this.setState({
            selectedIndex: ind,
        });
        const y = this.props.itemHeight * ind;
        setTimeout(() => {
            if (this.sview) {
                this.sview.scrollTo({ y });
            }
        }, 0);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    selectedItem: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
//@ts-ignore
ScrollPicker.propTypes = {
    style: PropTypes.object,
    dataSource: PropTypes.array,
    selectedIndex: PropTypes.number,
    onValueChange: PropTypes.func,
    renderItem: PropTypes.func,
    highlightColor: PropTypes.string,
    itemHeight: PropTypes.number,
    wrapperBackground: PropTypes.string,
    wrapperWidth: PropTypes.number,
    wrapperHeight: PropTypes.number,
    highlightWidth: PropTypes.number,
    highlightBorderWidth: PropTypes.number,
    itemTextStyle: PropTypes.object,
    activeItemTextStyle: PropTypes.object,
    onMomentumScrollEnd: PropTypes.func,
    onScrollEndDrag: PropTypes.func,
};
type Props = {
    onValueChange?: (value: any, index: number) => void
    onTouchStart?: () => void
    selectedIndex?: number
    dataSource: any[]
    itemHeight: number
    wrapperBackground: string
    wrapperHeight: number
    wrapperWidth: number
    highlightWidth: number
    highlightBorderWidth: number
    highlightColor: string
    onMomentumScrollEnd: () => void
    onScrollEndDrag: () => void
    itemTextStyle: ItemTextStyle
    activeItemTextStyle: ItemTextStyle
}
type ItemTextStyle = {
    fontSize: number
    lineHeight: number
    textAlign: string
    color: string
}
//@ts-ignore
ScrollPicker.defaultProps = {
    dataSource: [1, 2, 3],
    itemHeight: 60,
    wrapperBackground: '#FFFFFF',
    wrapperHeight: 180,
    wrapperWidth: 150,
    highlightWidth: deviceWidth,
    highlightBorderWidth: 2,
    highlightColor: '#333',
    onMomentumScrollEnd: () => {
    },
    onScrollEndDrag: () => {
    },
    itemTextStyle: { fontSize: 20, lineHeight: 26, textAlign: 'center', color: '#B4B4B4' },
    activeItemTextStyle: { fontSize: 20, lineHeight: 26, textAlign: 'center', color: '#222121' }
};