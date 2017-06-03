import {h} from 'preact';

export default ({children}) => (
    <div className="mdl-layout__container">
        <div fixed-header="true"
             className="mdl-layout mdl-js-layout mdl-layout--fixed-header is-small-screen is-upgraded"
             data-upgraded=",MaterialLayout">
            <header className="mdl-layout__header is-casting-shadow">
                <div className="mdl-layout__header-row">
                    {children}
                </div>
            </header >
        </div >
    </div >
)
