import {UsersApi} from "../api/api";

const ADD_POST = 'ADD_POST';
const ON_CHANGE_POST_INPUT = 'ON_CHANGE_POST_INPUT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    postsData:[
        {id: 1, likesCount: 22, text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam animi culpa, dolores eaque exercitationem facilis fuga hic libero magni, neque odio possimus quasi quia, saepe veritatis voluptates! Ad, sunt."},
        {id: 2, likesCount: 13, text: "Aliquid aspernatur cumque debitis esse id necessitatibus nihil recusandae reprehenderit voluptate! Alias aliquam dolore eaque eveniet hic iure magni neque nisi non, pariatur quam quis ratione totam vitae voluptatibus.Fuga? Ad aperiam, atque culpa cupiditate eveniet facilis natus quae quaerat rem. Accusamus cumque dolor esse iusto, molestiae molestias natus necessitatibus non quae quam quidem quos rem rerum tempore velit vero."},
        {id: 3, likesCount: 217, text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam atque dignissimos enim facilis labore molestiae nisi non sunt tempore velit? Consequuntur, dolorum eius omnis possimus quam quibusdam quisquam sunt voluptate? Aliquam aperiam, dolore dolorum earum illum inventore mollitia necessitatibus nisi quaerat quia quidem quo, repellat reprehenderit tempore tenetur. Aliquid atque consectetur consequatur eligendi ex iure numquam recusandae sequi vero voluptas?"}
    ],
    profile: null,
    inputValue: ''
};

const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST : {
            const lastPostId = state.postsData[state.postsData.length - 1].id
            const postText = state.inputValue;

            const newPost = {
                id: lastPostId + 1,
                likesCount: 0,
                text: postText
            }

            return {
                ...state,
                postsData: [...state.postsData, newPost],
                inputValue: ''
            };
        }
        case ON_CHANGE_POST_INPUT : {
            return {
                ...state,
                inputValue: action.text
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state;
    }
}

// action creators
export const createAddPostAction = () => ( {type: ADD_POST} );
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const createChangePostInputAction = (text) => {
    return {
        type: ON_CHANGE_POST_INPUT,
        text: text
    }
};

// thunk creators
export const getUserProfile = (userId) => {
    return (dispatch) => {
        UsersApi.getProfile(userId)
            .then(res => dispatch(setUserProfile(res.data)))
    }
}


export default profilePageReducer;