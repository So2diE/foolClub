import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, TextField,InputAdornment} from '@material-ui/core';
import NumberFormat from 'react-number-format';


const NumberFormatCustom = props => {

    const {inputRef, onChange, placeholder, ...other} = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            placeholder={placeholder}
            onValueChange={values => {
                console.log(values)
                onChange({
                    target: {
                        value: values.value,
                    }
                })
            }}
        />
    )

}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

const styles = theme => ({
    input: {}, cleave: {
        fontSize: '18px',
        color: 'currentColor',
        margin: 0,
        padding: '16px 10px 17px 10px',
        border: '1px solid ' + theme.palette.secondary.main,

        display: 'block',
        minWidth: 0,
        flexGrow: 1,
        '&:focus': {
            outline: 'none',
        },
        '&::placeholder': {
            color: theme.palette.secondary.light,
        }

    }


})

const InputBar=props=> {


        const {classes, placeholder, multiline, title, value, onChange, disabled, validation, format} = props;

        return (<Grid container direction={'column'}>
                {<TextField
                    disabled={(disabled)}
                    value={value ? value : ''}
                    rows={multiline ? 5 : 1}
                    className={classes.input}
                    variant={'outlined'}
                    onChange={e => onChange(e.target.value)}
                    disableUnderline={true}
                    label={title}
                    placeholder={placeholder}
                    InputProps={
                        validation ? {
                            startAdornment: <InputAdornment position="start">{validation.prefix}</InputAdornment>,
                            inputComponent: NumberFormatCustom,
                            inputProps: {
                                format: validation.format,
                                mask: validation.mask,

                            },
                        } : null
                    }
                    multiline={!!multiline}
                />

                }

            </Grid>


        );
}

InputBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputBar);