import { Component } from 'react';
import Section from './components/Section/Section';
import Statistics from './components/Statistics/Statistics';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Notification from './components/Notification/Notification';

class App extends Component {
    state = {
        good: 0,
        neutral: 0,
        bad: 0,
    };

    countTotalFeedback = () =>
        Object.values(this.state).reduce((acc, value) => acc + value);

    countPositiveFeedbackPercentage = () =>
        Math.round((this.state.good * 100) / this.countTotalFeedback()) || 0;

    onLeaveFeedback = label =>
        this.setState(prevState => ({ [label]: prevState[label] + 1 }));

    render() {
        const { good, neutral, bad } = this.state;

        return (
            <>
                <Section title="Please leave feedback">
                    <FeedbackOptions
                        options={Object.keys(this.state)}
                        onLeaveFeedback={this.onLeaveFeedback}
                    />
                </Section>

                <Section title="Statistics">
                    {this.countTotalFeedback() ? (
                        <Statistics
                            good={good}
                            neutral={neutral}
                            bad={bad}
                            total={this.countTotalFeedback()}
                            positivePercentage={this.countPositiveFeedbackPercentage()}
                        />
                    ) : (
                        <Notification message="No feedback given" />
                    )}
                </Section>
            </>
        );
    }
}

export default App;
