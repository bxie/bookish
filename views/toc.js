import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from "./header";
import { Parser } from "../parser";

class TableOfContents extends React.Component {

	constructor(props) {

		super(props);

	}

	// Always start at the top of the page.
	componentDidMount() {
		window.scrollTo(0, 0)
	}

	getProgressDescription(progress) {

		if(progress === null)
			return null;
		else if(progress === 0)
			return null;
		else if(progress < 30)
			return "; just started";
		else if(progress < 70)
			return "; halfway";
		else if(progress < 95)
			return "; almost done";
		else
			return "; done";

	}

	render() {

		// Get the chapter progress
		var progress = localStorage.getItem("chapterProgress");
		if(progress === null) {
			progress = {};
		} else {
			progress = JSON.parse(progress);
		}

		var readingTime = this.props.app.getBookReadingTime();

		return (
			<div className="toc">

				<Header 
					image={this.props.app.getCover()} 
					header={this.props.app.getTitle()} 
					content={
						<div>
							<em>by</em> {Parser.parseContent(this.props.app.getAuthors()).toDOM()}
							<small>
								{this.props.app.getContributors() ? 
								<span><em> with contributions from</em> {Parser.parseContent(this.props.app.getContributors()).toDOM()}</span> : null}
							</small>
						</div>
					}
				/>

				<small><em>{readingTime < 60 ? Math.max(5, (Math.floor(readingTime / 10) * 10)) + " minute read" : (new Number(readingTime / 60.0)).toPrecision(1) + " hour read" }</em></small>

				{Parser.parseChapter(this.props.app.getDescription()).toDOM()}

				<h2>Chapters</h2>

				<table className="table" id="toc">
					<tbody>
						{
							_.map(this.props.app.getChapters(), (chapter, index) => {
								return (
									<tr key={"chapter" + index}>
										<td>
											<img 
												className="img-rounded" 
												style={{width: "5em"}} 
												src={"images/" + chapter[2]}
												alt={chapter[3]} 
											/>
										</td>
										<td><em>Chapter {index + 1}</em></td>
										<td>
											{
												// If it's not loaded, say so.
												this.props.app.getContent(chapter[1]) === undefined ?
													<span>...</span> :
												// If it failed to load, say so.
												this.props.app.getContent(chapter[1]) === null ?
													<div>
														<span>{chapter[0]}</span> 
														<br/>
														<small>
															<em>
																Unable to load chapter.
															</em>
														</small>
														
													</div> :
													// If it did load, link it!
													<div>
														<Link to={"/" + chapter[1]}>{chapter[0]}</Link>
														<br/>
														<small>
															<em>
																{ this.props.app.getChapterReadingTime(chapter[1]) } minute read
																{
																	this.getProgressDescription(chapter[1] in progress ? progress[chapter[1]] : null)
																}
															</em>
														</small>
													</div>
											}
										</td>
									</tr>
								)
							})
						}
						{
							this.props.app.getReferences() === null ? null :
							<tr key="references">
								<td></td>
								<td></td>
								<td><Link to="/references">References</Link></td>
							</tr>
						}
						<tr key="index">
							<td></td>
							<td></td>
							<td><Link to="/index">Index</Link></td>
						</tr>
						<tr key="search">
							<td></td>
							<td></td>
							<td><Link to="/search">Search</Link></td>
						</tr>
					</tbody>
				</table>

				<h2>License</h2>

				<p>{this.props.app.getLicense() ? Parser.parseContent(this.props.app.getLicense()).toDOM() : "All rights reserved."}</p>

				<h2>Revisions</h2>
				
				<ul>
					{_.map(this.props.app.getRevisions(), (revision, index) => {
						return <li key={"revision" + index}><em>{revision[0]}</em>. {Parser.parseContent(revision[1]).toDOM()}</li>;
					})}
				</ul>

			</div>
		);

	}

}

export {TableOfContents};