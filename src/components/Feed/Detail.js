import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import moment from 'moment';
import withWidth, {isWidthUp, isWidthDown} from '@material-ui/core/withWidth/index';


import Header from '../Layout/Body/Header';
import List from '../Widget/List'
import {getTagsCountsArray, redirectUrl, refactorTextLength} from "../../api/ApiUtils";
import {FEED_EDIT_FILTER} from "../../constants/actionType";
import LoadingPage from '../Layout/LoadingPage'
import Media from '../Widget/Media'
import classNames from 'classnames'
import ReactHtmlParser from "react-html-parser";
import {useI18nText} from "../../hooks/useI18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {I18nText} from "../Widget/I18nText";


const styles = theme => (
    {
        backArrow: {
            cursor: 'pointer',
            backgroundColor: 'transparent',
            borderWidth: 0,
            display: 'flex',
            alignItems: 'center'
        },
        backIcon: {
            fontSize: 23,
            marginRight: 8
        },
        backText: {
            fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
        },

        container: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        menu: {
            width: '25%'
        },

        content: {
            width: 'calc(75% - 50px)',
            marginLeft: 50
        },
        head: {
            display: 'flex',
            marginBottom: 25
        },
        share: {
            flex: 1,
            fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
        },
        date: {
            fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
        },
        section: {
            marginTop: 60,
            '&:first-child': {
                marginTop: 0
            }
        },
        title: {
            fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
        },
        description: {
            fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
        },




        basicInfo: {
            paddingBottom: '10px',
        },
        basicInfoText: {
            display: "inline-block",
            paddingLeft: '5px',
        }
    });


const mapStateToProps = state => ({
    feeds: state.feed.feeds,
    products: state.product.products,
});


const mapDispatchToProps = dispatch => ({
        editFeedFilter: (key, value) => dispatch({
            type: FEED_EDIT_FILTER,
            payload: {
                key: key,
                value: value,
            },
        }),


    }
);

const FeedDetail = (props) => {
    const {feeds, match, classes, editFeedFilter, history, width} = props;
    const isMobile = !isWidthUp('sm', width);

    const hasValidFeed = () => (feeds && !!feeds.find(n => n.id.toString() === match.params.id));
    if (!props.products) return <LoadingPage/>;

    if (hasValidFeed()) {
        const feed = feeds.find(n => n.id.toString() === match.params.id);
        return <div>
                <Header title={refactorTextLength(feed.sections[0].title)}/>
                <div
                    style={{
                        padding: `0 ${isWidthUp('lg', width) ? 9 : 5}%`
                    }}
                >
                    <div style={{
                        marginBottom: 55
                    }}>
                        <button
                            type="button"
                            onClick={() => redirectUrl('/articles', history)}
                            className={classes.backArrow}
                        >
                            <i
                                className={classNames('icon-circle-left', classes.backIcon)}
                            />
                            <b
                                className={classes.backText}
                            >
                                <I18nText keyOfI18n={keyOfI18n.FEED_DETAIL_BACK_TO_FEED_LIST}/>
                            </b>

                        </button>
                    </div>
                    <div
                        className={isWidthUp('sm', width) ? classes.container : ''}
                    >
                        {!isMobile && <div
                            className={classes.menu}
                        >
                            <List
                                data={getTagsCountsArray(feeds, (tag, number) => {
                                    editFeedFilter('tag', tag);
                                    redirectUrl('/articles', history, false)
                                })}
                                title={useI18nText(keyOfI18n.FEED_CATEGORY)}/>
                        </div>}
                        <div
                            className={isMobile ? '' : classes.content}
                        >
                            <div
                                className={classes.head}
                            >
                                <div
                                    className={classes.share}
                                >
                                    <i className={'icon-icons8-edit'}/>&nbsp;
                                    {(feed.reactor &&feed.reactor.length > 0) ? feed.reactor[0].name.first + ' ' + feed.reactor[0].name.last : useI18nText(keyOfI18n.NO_AUTHORS)}
                                </div>
                                <div
                                    className={classes.date}
                                >
                                    <i className={'icon-icons8-calendar'}/>&nbsp;
                                    {moment(feed.time).format('MMM Do YYYY')}
                                </div>
                            </div>
                            <div>
                                {feed.sections.map((n, i) => <section
                                    className={classes.section}
                                >
                                    {i ? <h2
                                        className={classes.title}
                                    >{n.title}</h2> : null}
                                    <Media data={feed.sections[i].medias}/>
                                    <p
                                        className={classes.description}
                                    >{ReactHtmlParser(n.description)}</p>
                                </section>)}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    } else {
        return <LoadingPage/>
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withWidth()(FeedDetail)))

