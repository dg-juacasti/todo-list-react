import React, { FC } from 'react'
import Typography from '../../atoms/typography'

import './index.scss'

export const CardComplete: FC<any> = ({numberElements, numberElementsCompleted}) => {
    return (
        <div className='card'>
            <div className='card__body'>
                <Typography color='black'>
                    {numberElementsCompleted} de {numberElements} tarea(s) completada(s)
                </Typography>
            </div>
        </div>
    )
}
