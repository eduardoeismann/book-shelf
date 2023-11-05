import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class BooksInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '', // name string
            subtitle: '', // rating string
            pages: 0 // time number
        }
    }

    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleChangeInputSubtitle = async event => {
        const subtitle = event.target.validity.valid
            ? event.target.value
            : this.state.subtitle

        this.setState({ subtitle })
    }

    handleChangeInputPages = async event => {
        const pages = event.target.value
        this.setState({ pages })
    }

    handleIncludeBook = async () => {
        const { title, subtitle, pages } = this.state
        const arrayPages = pages.split('/')
        const payload = { title, subtitle, pages: arrayPages }

        await api.insertBook(payload).then(res => {
            window.alert(`Book inserted successfully`)
            this.setState({
                title: '',
                subtitle: '',
                pages: 0
            })
        })
    }

    render() {
        const { title, subtitle, pages } = this.state
        return (
            <Wrapper>
                <Title>Create Book</Title>

                <Label>Title: </Label>
                <InputText
                    type="text"
                    value={title}
                    onChange={this.handleChangeInputTitle}
                />

                <Label>Subtitle: </Label>
                <InputText
                    type="number"
                    value={subtitle}
                    onChange={this.handleChangeInputSubtitle}
                />

                <Label>Time: </Label>
                <InputText
                    type="number"
                    value={pages}
                    onChange={this.handleChangeInputPages}
                />

                <Button onClick={this.handleIncludeBook}>Add Book</Button>
                <CancelButton href={'/books/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default BooksInsert
