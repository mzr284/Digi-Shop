export default function AddUser(){
    return(
        <div>
            <form className="flex flex-col px-2 bg-white">
                <div>
                    <h3>Username</h3>
                    <input className="bg-gray-100 rounded-sm"/>
                </div>
                <div>
                    <h3>E-mail</h3>
                    <input />
                </div>
                <div>
                    <h3>Password</h3>
                    <input />
                </div>
                <div>
                    <h3>Password</h3>
                    <input />
                </div>
                <div>
                    <h3>Permission</h3>
                    <input />
                </div>
            </form>
        </div>
    )
}