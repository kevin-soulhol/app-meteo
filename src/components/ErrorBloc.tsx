function ErrorBloc({ message }: { message: string }) {

    return (
        <div className="error">
            <div className="deco"></div>
            {message}
        </div>
    )

}


export default ErrorBloc;