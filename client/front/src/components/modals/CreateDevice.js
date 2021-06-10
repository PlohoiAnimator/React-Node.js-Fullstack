import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Dropdown, Row, Col } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI'
import { Context } from '../../index'
import {observer} from 'mobx-react-lite'

const CreateDevice = ({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchBrands().then(data => device.setBrands(data))
        fetchTypes().then(data => device.setTypes(data))
    })

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

    return (
        <Modal
            show = {show}
            onHide = {onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Добавить статью
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Dropdown className='mt-2'>
                            <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.types.map(type =>
                                        <Dropdown.Item
                                            key={type.id}
                                            onClick = {() => device.setSelectedType(type)}
                                        >
                                            {type.name}
                                        </Dropdown.Item>
                                    )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className='mt-2 mb-3'>
                            <Dropdown.Toggle> {device.selectedBrand.name || 'Выберите брэнд'} </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.brands.map(brand =>
                                        <Dropdown.Item
                                            key={brand.id}
                                            onClick = {() => device.setSelectedBrand(brand)}
                                        >
                                            {brand.name}
                                        </Dropdown.Item>
                                    )}
                            </Dropdown.Menu>
                        </Dropdown>
                        
                        <Form.Control
                            placeholder='Введите название заголовка'
                            value = {name}
                            onChange = {e => setName(e.target.value)}
                        />
                        <Form.Control
                                className='mt-3'
                                placeholder='Введите рейтинг статьи'
                                type='number'
                                value = {price}
                                onChange = {e => setPrice(Number(e.target.value))}
                            />
                        <Form.Control
                            className='mt-3'
                            type='file'
                            onChange = {selectFile}
                        />

                        <hr/>
                        <Button
                            variant={'outline-dark'}
                            onClick={addInfo}
                        >
                            Добавить новую статью 
                        </Button>
                        {info.map(i =>
                                <Row className='mt-4' key={i.number}>
                                    
                                    <Col md={4}>
                                        <Form.Control
                                            placeholder='Введите название темы'
                                            value = {i.title}
                                            onChange = {e => changeInfo('title', e.target.value, i.number)}
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Form.Control
                                            placeholder='Введите описание темы'
                                            value = {i.description}
                                            onChange = {e => changeInfo('description', e.target.value, i.number)}
                                        />
                                    </Col>
                                    
                                    <Col md={4}>
                                        <Button 
                                            variant='outline-danger'
                                            onClick={() => removeInfo(i.number)}
                                        >
                                            Удалить
                                        </Button>
                                    </Col>

                                </Row>
                            )}
                </Form>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant={'outline-success'} onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateDevice












/*
                <Form>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                    <Dropdown.Item key={type.id}> {type.name} </Dropdown.Item>
                                )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>Выберите брэнд</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                    <Dropdown.Item key={brand.id}> {brand.name} </Dropdown.Item>
                                )}
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    <Form.Control className='mt-3' placeholder='Введите название устройства'/>
                    <Form.Control className='mt-3' placeholder='Введите стоимость устройства' type='number'/>
                    <Form.Control className='mt-3' type='file'/>
                    <hr/>
                    <Button variant={'outline-dark'}>
                        Добавить новое свойство
                    </Button>

                </Form>*/