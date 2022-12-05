import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolis.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeCheckBox: (id: string, e: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    //let [error, setError] = useState(false)
    let [error, setError] = useState<string|null>(null)
    let [activeButton, setActiveButton] = useState<FilterValuesType>('all')

    const addTask = () => {
        if (title.trim()) {   //!==''
            props.addTask(title.trim());
        } else {
            setError('Title is required')
        }
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all");
        setActiveButton("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active");
        setActiveButton("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed");
        setActiveButton("completed")
    }
    const OnChangeCheckBoxHandler = (tId: string, eventValue: boolean) => {
        props.changeCheckBox(tId, eventValue)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.error : ''} value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error &&<div className={s.errorMessage}>{error}</div>}

        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    // const OnChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeCheckBox(t.id, e.currentTarget.checked)
                    // }

                    return <li className={t.isDone ?s.isDone :''} key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={(event)=>OnChangeCheckBoxHandler(t.id, event.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={activeButton==='all' ?s.activeFilter :''} onClick={onAllClickHandler}>All</button>
            <button className={activeButton==='active' ?s.activeFilter :''} onClick={onActiveClickHandler}>Active</button>
            <button className={activeButton==='completed' ?s.activeFilter :''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
