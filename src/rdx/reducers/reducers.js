import {combineReducers} from 'redux';
import {errors, user, bgImage, notifications, stats, bgMenuImage} from './defaultReducers';
import {courses, course, lessons,lesson} from './coursesReducers';
import {pages,diary} from './diaryReducers';
import {achievement, achievements} from './achievementReducers';


export default combineReducers({errors,user,bgImage,bgMenuImage,courses,course,lessons,lesson,diary,pages,achievements,achievement,notifications,stats})