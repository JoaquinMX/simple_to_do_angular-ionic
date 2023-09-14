export interface ToDo {
    _id: String,
    description: String,
    email: String,
    completed: boolean,
    created_at: Date,
    updated_at: Date,
}

export interface CreateToDoDTO extends Omit<ToDo, '_id'> {
    
}

export interface UpdateToDoDTO extends Partial<CreateToDoDTO>{
    
}