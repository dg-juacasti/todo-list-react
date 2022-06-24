import styled from 'styled-components'

interface IStyle {
  progress?: string
}

const Styles = styled.div<IStyle>`
  .todoList__bar {
    margin: 8px 0px;
    display: flex;
    width: 100%;

    &__button {
      flex-grow: 1;
      margin-right: 1rem;
    }
  }

  .todoList__list {
    width: 100%;
  }

  .todoList__empty {
    margin: 3rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    i {
      margin-bottom: 1rem;
      background-color: #4dbdf0;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .todoList__progress {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__count {
      margin: 1rem 0;
      border: 1px solid gray;
      padding: 0.6rem;
      border-radius: 4px;
      position: relative;

      &--progress {
        background-color: yellow;
        position: absolute;
        top: 0;
        left: 0;
        width: ${(props) => props.progress + '%'};
      }
    }

    @media screen and (min-width: 480px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .todoList__buttons {
    display: flex;
    flex-direction: column;

    &__button {
      margin: 0.5rem 0;
    }
  }
`

export default Styles
