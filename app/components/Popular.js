import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import * as api from '../utils/api';

function SelectLanguage(props) {
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python', 'Swift', 'Haskell', 'C++', 'Go'];
    return (
        <ul className='languages'>
            {languages.map((language) => {
                return (
                    <li
                        style={language === props.selectedLanguage ? { color: '#d0021b' } : null }
                        onClick={props.onSelect.bind(null, language)}
                        key={language}>
                        {language}
                    </li>
                )
            })}
        </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

function RepoGrid(props) {
    return (
        <ul className='popular-list'>
            { props.repos.map((repo, index) => {
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-item'>
                            <li>
                                <img
                                    className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={`Avatar for ${repo.owner.login}`}
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
};

class Popular extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) {
        this.setState(() => ({
            selectedLanguage: lang,
            repos: null
        }));

        api.fetchPopularRepos(lang)
            .then((repos) => this.setState(() => ({
                repos
            }))
        );
    }

    render() {
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {!this.state.repos
                    ? <Loading  text='Downloading' speed={10} />
                    : <RepoGrid repos={this.state.repos }/> }

            </div>
        )
    }
}

export default Popular;