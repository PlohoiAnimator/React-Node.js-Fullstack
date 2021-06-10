import React, { useContext } from 'react'
import {Row, Card} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import {Context} from '../index'

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row>
            {device.brands.map(brand =>
                    <Card
                        key = {brand.id}
                        className = 'p-3'
                        style = {{cursor: 'pointer'}}
                        onClick = {() => device.setSelectedBrand(brand)}
                        border = {brand.id === device.selectedBrand.id ? "danger" : "light"}
                    >
                        {brand.name}
                    </Card>
                )}
        </Row>
    )
})

export default BrandBar