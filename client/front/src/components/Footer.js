import React from 'react'

const Footer = () => {
    return(
    <div style =
        {{
            paddingTop: '1rem',
            paddingLeft: '15rem',
            paddingRight: '15rem',
            backgroundColor: '#626271',

        }}
        className="fixed-bottom">
        <div className='d-flex justify-content-between'>
            <p style={{color: 'whitesmoke'}}>ООО ДорСтандартПроект</p>
            <p style={{color: 'whitesmoke'}}>© 2021 Все права защищены</p>
            <p style={{color: 'whitesmoke'}}>Сделано: Ермилов.Дмитрий.Олегович</p> 
        </div>

    </div>
    )
}

export default Footer