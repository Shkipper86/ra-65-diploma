import { useAppDispatch } from "../../../entities/hooks/storeHooks";

export const Error = ({ request }: any) => {
    const dispatch = useAppDispatch();
    return (
        <div className="fetch-error">
            <h2>Произошла непредвиденная ошибка!</h2>
            <button type="button" className="btn btn-outline-primary" onClick={() => dispatch(request)}>Повторить запрос</button>
        </div>
    )
}
