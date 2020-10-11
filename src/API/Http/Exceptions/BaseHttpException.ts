class BaseHttpException extends Error {
    private status: number;
    public constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }

    public getStatus(): number {
        return this.status;
    }
}

export default BaseHttpException;