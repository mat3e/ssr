import { renderVue } from 'hypernova-vue';
import { renderReactWithApollo } from '../apollo/render';
import Tiles from '../Tiles';
import Search from '../Search';

renderReactWithApollo('Tiles', Tiles);
renderVue('Search', Search);
