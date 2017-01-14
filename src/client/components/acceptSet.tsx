
import * as React from "react";
import ScoredItem from '../ScoredItem'
let ClipboardBtn = require('react-clipboard.js');

interface Iprops {
    toggleStale: (index: number)=>void,
    id: number,
    data: ScoredItem
}

let Acceptance = function (props: Iprops) {
    let toggleStale = function (e) {
        console.log("Toggling " + e.target.id);
        props.toggleStale(e.target.id);
    };

    return (
        <li className="item">
            <div className={props.data.stale?"stale":"fresh" + ""} onClick={toggleStale} id={props.id}>
                {props.data.name}
            </div>
        </li>
    );
};

// AcceptSet
export default function (props) {
    let copytext = props.data.filter(el => !el.stale).map(el => el.number).join('\n');
    let enableButton = props.data.some(el => !el.stale);
    return (
        <div className="accepted">
            <ol>
                {props.data.map((accept, i) => {
                    return <Acceptance key={i} data={accept} toggleStale={props.toggleStale} id={i}/>
                })}
            </ol>
            <ClipboardBtn
                button-className="btn btn-primary"
                button-onClick={props.commit}
                data-clipboard-text={copytext}
                button-disabled={!enableButton}>
                Kermit
            </ClipboardBtn>
        </div>
    );
};