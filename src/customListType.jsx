export const customListTypes = [
    {
        name: 'random',
        description: 'Choosee values randomly',
        options: []
    },
    {
        name: 'weighted',
        description: 'Creates a statically weighted distribution that allows some values to be generated more frequently than others',
        options: ['weighted']
    },
    {
        name: 'dynamic',
        description: 'Creates a dynamically weighted distribution based on the values of other fields in your schema',
        options: ['dynamic']
    },
    {
        name: 'sequential',
        description: 'Generates values in order then repeats',
        options: []
    },
    {
        name: 'cartesian',
        description: 'Generates values in order and then repeats. Any subsequent fields with cartesian selected will iterate in a nested fashion, producing a cartesian product of all possible combinations of values',
        options: []
    },
    
]
