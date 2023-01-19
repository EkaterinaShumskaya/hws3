import React, {
    SelectHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent, useEffect,
} from 'react'
import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
    options,
    className,
    onChange,
    onChangeOption,

    ...restProps
}) => {
    const mappedOptions: any[] = options
        ? options.map((o) => {

            return (
                <option
                    id={'hw7-option-' + o.id}
                    className={s.option}
                    key={o.id}
                    value={o.id}
                >
                    {o.value}
                </option>
            )
        })
        : [] // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {

        onChangeOption?.(+e.currentTarget.value)


        // делают студенты
    }

    useEffect(() => {

        const options = document.querySelectorAll('option')

        options.forEach(opt => {
            if ( +opt.value === restProps.value) {
                opt.setAttribute('selected', 'selected')
            }else {
                opt.removeAttribute('selected')
            }
        })
    },[restProps.value])

    const finalSelectClassName = s.select + (className ? ' ' + className : '')

    return (
        <select
            className={finalSelectClassName}
            onChange={onChangeCallback}
            {...restProps}
        >
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
